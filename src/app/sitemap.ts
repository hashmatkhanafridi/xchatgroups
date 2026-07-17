import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://xchatgroups.chat';

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Category pages
  const { data: categories } = await supabase
    .from('categories')
    .select('slug');

  if (categories) {
    routes.push(
      ...categories.map((c) => ({
        url: `${baseUrl}/category/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      }))
    );
  }

  // Individual group pages
  const { data: groups } = await supabase
    .from('groups')
    .select('id, slug, submitted_at')
    .eq('status', 'approved');

  if (groups) {
    routes.push(
      ...groups.map((g) => ({
        url: `${baseUrl}/groups/${g.slug || g.id}`,
        lastModified: new Date(g.submitted_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    );
  }

  return routes;
}
