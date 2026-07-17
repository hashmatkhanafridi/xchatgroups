import { supabase } from '@/lib/supabase';
import { GroupCard } from '@/components/GroupCard';
import { Group, Category } from '@/lib/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 3600;

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data } = await supabase
    .from('categories')
    .select('name, slug, intro_text')
    .eq('slug', params.slug)
    .single();

  if (!data) return { title: 'Category Not Found' };

  const description =
    data.intro_text?.slice(0, 155) ??
    `Browse and join active XChat groups in the ${data.name} category. Find communities that match your interests.`;

  return {
    title: `${data.name} XChat Groups - Find & Join | XChat Groups Directory`,
    description,
    openGraph: {
      title: `${data.name} XChat Groups`,
      description,
      url: `https://xchatgroups.chat/category/${data.slug}`,
      type: 'website',
    },
  };
}

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

function CategoryJsonLd({
  category,
  groups,
}: {
  category: Category;
  groups: Group[];
}) {
  const pageUrl = `https://xchatgroups.chat/category/${category.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} XChat Groups`,
    description:
      category.intro_text ??
      `Browse active XChat groups in the ${category.name} category.`,
    url: pageUrl,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://xchatgroups.chat' },
        { '@type': 'ListItem', position: 2, name: category.name, item: pageUrl },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      name: `${category.name} XChat Groups`,
      numberOfItems: groups.length,
      itemListElement: groups.map((group, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://xchatgroups.chat/groups/${group.slug || group.id}`,
        name: group.name,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (categoryError || !categoryData) notFound();

  const category = categoryData as Category;

  const { data: groupsData } = await supabase
    .from('groups')
    .select('*')
    .eq('category_id', category.id)
    .eq('status', 'approved')
    .order('submitted_at', { ascending: false });

  const groups = (groupsData || []) as Group[];

  return (
    <>
      <CategoryJsonLd category={category} groups={groups} />

      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{category.name}</span>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {category.name} <span className="text-primary">Groups</span>
          </h1>

          {/* Category intro text — eliminates thin-content flags */}
          {category.intro_text ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 text-muted-foreground leading-relaxed text-sm sm:text-base max-w-3xl">
              {category.intro_text}
            </div>
          ) : (
            <p className="text-muted-foreground max-w-2xl">
              Browse and join {groups.length} active XChat{' '}
              {groups.length === 1 ? 'group' : 'groups'} in the{' '}
              {category.name} category. Discover communities that match your
              interests and connect with like-minded people.
            </p>
          )}
        </div>

        {groups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 border-dashed">
            <p className="text-muted-foreground mb-4">
              No groups found in this category yet.
            </p>
            <Link
              href="/submit"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 inline-block"
            >
              Be the first to submit a group
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
