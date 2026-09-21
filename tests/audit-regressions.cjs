const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');

function load(file, mocks = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', compiled)(
    id => Object.hasOwn(mocks, id) ? mocks[id] : require(id), module, module.exports,
  );
  return module.exports;
}

test('JSON-LD preserves text but cannot close its script element', () => {
  const { serializeJsonLd } = load('src/lib/utils.ts');
  const data = { name: '</script><script>alert(1)</script>', description: 'A < B & اردو' };
  const encoded = serializeJsonLd(data);
  assert.equal(encoded.includes('<'), false);
  assert.deepEqual(JSON.parse(encoded), data);
});

test('admin authentication fails closed and accepts passwords containing colons', () => {
  let authorization = null;
  const { requireAdmin } = load('src/lib/admin-auth.ts', {
    'next/headers': { headers: () => ({ get: () => authorization }) },
  });
  const previous = process.env.ADMIN_PASSWORD;
  try {
    process.env.ADMIN_PASSWORD = 'test:password';
    for (const value of [null, 'Bearer abc', 'Basic !!!', 'Basic ' + Buffer.from('admin:wrong').toString('base64')]) {
      authorization = value;
      assert.throws(requireAdmin, /Unauthorized/);
    }
    authorization = 'Basic ' + Buffer.from('admin:test:password').toString('base64');
    assert.doesNotThrow(requireAdmin);
    delete process.env.ADMIN_PASSWORD;
    assert.throws(requireAdmin, /Unauthorized/);
  } finally {
    if (previous === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = previous;
  }
});

test('all admin actions reject unauthorized calls before touching the database', async () => {
  let databaseCalls = 0;
  const actions = load('src/app/admin/actions.ts', {
    '@/lib/admin-auth': { requireAdmin() { throw new Error('Unauthorized'); } },
    '@/lib/supabase': { supabaseAdmin: { from() { databaseCalls++; throw new Error('Unexpected database access'); } } },
    'next/cache': { revalidatePath() {} },
  });
  await assert.rejects(actions.updateGroupStatus('id', 'approved'), /Unauthorized/);
  await assert.rejects(actions.updateGroupDetails('id', {}), /Unauthorized/);
  await assert.rejects(actions.deleteGroup('id'), /Unauthorized/);
  assert.equal(databaseCalls, 0);
});

test('successful moderation refreshes group pages and sitemap', async () => {
  const paths = [];
  const query = { update() { return this; }, delete() { return this; }, eq: async () => ({ error: null }) };
  const actions = load('src/app/admin/actions.ts', {
    '@/lib/admin-auth': { requireAdmin() {} },
    '@/lib/supabase': { supabaseAdmin: { from: () => query } },
    'next/cache': { revalidatePath: (...args) => paths.push(args) },
  });
  for (const operation of [() => actions.updateGroupStatus('id', 'approved'), () => actions.updateGroupDetails('id', {}), () => actions.deleteGroup('id')]) {
    paths.length = 0;
    assert.deepEqual(await operation(), { success: true });
    assert(paths.some(([path, type]) => path === '/groups/[id]' && type === 'page'));
    assert(paths.some(([path]) => path === '/sitemap.xml'));
  }
});

test('sitemap keeps UUID fallback and rejects database failures', async () => {
  let fail = false;
  const sitemap = load('src/app/sitemap.ts', {
    '@/lib/supabase': { supabase: { from: table => ({
      select: () => table === 'categories'
        ? Promise.resolve({ data: [{ slug: 'tech-ai' }], error: fail ? new Error('offline') : null })
        : { eq: async () => ({ data: [{ id: 'uuid', slug: null }, { id: 'uuid2', slug: 'named-group' }], error: null }) },
    }) } },
  }).default;
  const entries = await sitemap();
  assert(entries.some(entry => entry.url.endsWith('/groups/uuid')));
  assert(entries.some(entry => entry.url.endsWith('/groups/named-group')));
  assert(entries.every(entry => entry.lastModified === undefined));
  fail = true;
  await assert.rejects(sitemap(), /Unable to load sitemap categories/);
});
