import { supabase } from '@/lib/supabase';
import { Group, Category } from '@/lib/types';
import { GroupCard } from '@/components/GroupCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Users, ExternalLink, ArrowLeft, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600;

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getGroup(idOrSlug: string) {
  // Try slug first, then fall back to UUID id
  const { data: bySlug } = await supabase
    .from('groups')
    .select('*, categories(*)')
    .eq('slug', idOrSlug)
    .eq('status', 'approved')
    .single();

  if (bySlug) return bySlug;

  const { data: byId } = await supabase
    .from('groups')
    .select('*, categories(*)')
    .eq('id', idOrSlug)
    .eq('status', 'approved')
    .single();

  return byId;
}

async function getRelatedGroups(categoryId: string, excludeId: string) {
  const { data } = await supabase
    .from('groups')
    .select('*, categories(*)')
    .eq('category_id', categoryId)
    .eq('status', 'approved')
    .neq('id', excludeId)
    .limit(3);
  return data || [];
}

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const group = await getGroup(params.id);
  if (!group) return { title: 'Group Not Found' };

  const category = group.categories as unknown as Category;
  const shortDesc = group.description?.slice(0, 155);

  return {
    title: `${group.name} XChat Group - Join Now | XChat Groups Directory`,
    description: shortDesc,
    openGraph: {
      title: `${group.name} – XChat Group`,
      description: shortDesc,
      url: `https://xchatgroups.chat/groups/${params.id}`,
      type: 'website',
    },
  };
}

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

function GroupJsonLd({ group, category, url }: { group: any; category: Category | null; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: group.name,
    description: group.description,
    url,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://xchatgroups.chat' },
        category
          ? { '@type': 'ListItem', position: 2, name: category.name, item: `https://xchatgroups.chat/category/${category.slug}` }
          : null,
        { '@type': 'ListItem', position: category ? 3 : 2, name: group.name, item: url },
      ].filter(Boolean),
    },
    mainEntity: {
      '@type': 'OnlineCommunity',
      name: group.name,
      description: group.description,
      url: group.join_link,
      ...(group.member_count ? { numberOfMembers: group.member_count } : {}),
      ...(category ? { about: { '@type': 'Thing', name: category.name } } : {}),
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

export default async function GroupPage({ params }: { params: { id: string } }) {
  const group = await getGroup(params.id);
  if (!group) notFound();

  const category = group.categories as unknown as Category | null;
  const relatedGroups = category ? await getRelatedGroups(category.id, group.id) : [];
  const pageUrl = `https://xchatgroups.chat/groups/${params.id}`;

  return (
    <>
      <GroupJsonLd group={group} category={category} url={pageUrl} />

      <div className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/category/${category.slug}`} className="hover:text-primary transition-colors">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground font-medium truncate max-w-[200px]">{group.name}</span>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-10">
          {/* Category Tag */}
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full mb-4 hover:bg-primary/20 transition-colors"
            >
              <Tag size={11} />
              {category.name}
            </Link>
          )}

          {/* H1 */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
            {group.name}
          </h1>

          {/* Stats Row */}
          <div className="flex items-center gap-4 mb-6">
            {group.member_count && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <Users size={14} />
                <span>{group.member_count.toLocaleString()}+ members</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
              Active XChat Group
            </div>
          </div>

          {/* Full Description */}
          <div className="prose prose-invert prose-sm sm:prose max-w-none text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">
            {group.description}
          </div>

          {/* CTA */}
          <a
            href={group.join_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            Join Chat on X
            <ExternalLink size={16} />
          </a>

          <p className="mt-3 text-xs text-muted-foreground/60">
            You will be redirected to the XChat app to join this group.
          </p>
        </div>

        {/* Related Groups */}
        {relatedGroups.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-5">
              More {category?.name} Groups
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedGroups.map((related: any) => (
                <GroupCard
                  key={related.id}
                  group={related as unknown as Group}
                  category={category || undefined}
                />
              ))}
            </div>
            {category && (
              <div className="mt-6 text-center">
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ArrowLeft size={14} />
                  View all {category.name} groups
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
}
