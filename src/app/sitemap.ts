import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.xchatgroups.chat';
  const now = new Date();

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/submit`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Category pages
  const { data: categories } = await supabase
    .from('categories')
    .select('slug, created_at');

  if (categories) {
    routes.push(
      ...categories.map((c) => ({
        url: `${baseUrl}/category/${c.slug}`,
        lastModified: c.created_at ? new Date(c.created_at) : now,
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
        lastModified: g.submitted_at ? new Date(g.submitted_at) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    );
  }

  return routes;
}
