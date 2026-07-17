/**
 * Converts a group name to a URL-friendly slug.
 * Used as a fallback when no explicit slug column exists in the DB.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Returns the canonical URL path for a group page.
 * Uses explicit slug if available, otherwise falls back to the UUID id.
 */
export function groupPath(group: { id: string; slug?: string | null }): string {
  return `/groups/${group.slug || group.id}`;
}
