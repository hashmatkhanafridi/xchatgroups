import { serializeJsonLd } from '@/lib/utils';
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

  const canonicalUrl = `https://www.xchatgroups.chat/category/${data.slug}`;
  const description =
    data.intro_text?.slice(0, 155) ??
    `Browse, discover, and join active ${data.name} XChat groups. Connect with real people and communities in the ${data.name} directory on X.`;

  return {
    title: `${data.name} XChat Groups - Find & Join | XChat Directory`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${data.name} XChat Groups`,
      description,
      url: canonicalUrl,
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
  const pageUrl = `https://www.xchatgroups.chat/category/${category.slug}`;

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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.xchatgroups.chat' },
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
        url: `https://www.xchatgroups.chat/groups/${group.slug || group.id}`,
        name: group.name,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Fetch category
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (categoryError || !categoryData) notFound();

  const category = categoryData as Category;

  // Fetch groups and all categories for cross-linking
  const [{ data: groupsData }, { data: allCategoriesData }] = await Promise.all([
    supabase
      .from('groups')
      .select('*')
      .eq('category_id', category.id)
      .eq('status', 'approved')
      .order('submitted_at', { ascending: false }),
    supabase
      .from('categories')
      .select('id, name, slug')
      .neq('slug', category.slug)
      .order('name'),
  ]);

  const groups = (groupsData || []) as Group[];
  const otherCategories = (allCategoriesData || []) as Category[];

  return (
    <>
      <CategoryJsonLd category={category} groups={groups} />

      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{category.name}</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {category.name} <span className="text-primary">XChat Groups</span>
          </h1>

          {/* Substantial, server-rendered intro text eliminating thin content flags */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 text-muted-foreground leading-relaxed text-sm sm:text-base max-w-4xl space-y-3">
            {category.intro_text ? (
              <p>{category.intro_text}</p>
            ) : (
              <>
                <p>
                  Welcome to the unofficial directory for <strong>{category.name} XChat groups</strong> on X (formerly Twitter).
                  Here you can explore user-submitted communities focused on {category.name.toLowerCase()}, network with passionate members, and exchange real-time updates.
                </p>
                <p>
                  Whether you are seeking real-time discussions, expert insights, or casual networking, this directory lists community links submitted for review. Browse the groups below or submit your own. Link availability and membership requirements can change.
                </p>
              </>
            )}
          </div>
        </header>

        {/* Group Listings */}
        <section aria-label="Group Listings" className="mb-16">
          {groups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 border-dashed">
              <p className="text-muted-foreground mb-4 text-base">
                No public groups listed under {category.name} yet.
              </p>
              <Link
                href="/submit"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 inline-block"
              >
                Submit the first {category.name} group
              </Link>
            </div>
          )}
        </section>

        {/* Cross-linking: Explore Other Categories */}
        {otherCategories.length > 0 && (
          <section aria-label="Other Categories" className="border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-6">Explore Other Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {otherCategories.map((otherCat) => (
                <Link
                  key={otherCat.id}
                  href={`/category/${otherCat.slug}`}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] transition-all text-center group flex items-center justify-center min-h-[70px]"
                >
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">
                    {otherCat.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
