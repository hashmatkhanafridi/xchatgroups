import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.xchatgroups.chat';

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/guides/xchat-group-links`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/submit`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Category pages
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('slug');

  if (categoriesError) throw new Error('Unable to load sitemap categories');

  if (categories) {
    routes.push(
      ...categories.map((c) => ({
        url: `${baseUrl}/category/${c.slug}`,
        changeFrequency: 'daily' as const,
        priority: 0.9,
      }))
    );
  }

  // Individual group pages
  const { data: groups, error: groupsError } = await supabase
    .from('groups')
    .select('id, slug')
    .eq('status', 'approved');

  if (groupsError) throw new Error('Unable to load sitemap groups');

  if (groups) {
    routes.push(
      ...groups.map((g) => ({
        url: `${baseUrl}/groups/${g.slug || g.id}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    );
  }

  return routes;
}
