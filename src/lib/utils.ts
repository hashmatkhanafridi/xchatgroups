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

/**
 * Keeps the first (most recently submitted) listing for each invitation URL.
 * The database remains unchanged; this only prevents duplicate cards and sitemap URLs.
 */
export function dedupeGroupsByInvitation<T extends { join_link?: string | null }>(groups: T[]): T[] {
  const seen = new Set<string>();

  return groups.filter((group) => {
    const rawLink = group.join_link?.trim();
    if (!rawLink) return true;

    let key = rawLink;
    try {
      const url = new URL(rawLink);
      url.hash = '';
      if (url.pathname.length > 1) {
        url.pathname = url.pathname.replace(/\\/+$/, '');
      }
      key = url.toString();
    } catch {
      // Preserve non-URL values rather than accidentally hiding unrelated rows.
      key = rawLink;
    }

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Keep user content inside JSON-LD rather than allowing it to close the script. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
