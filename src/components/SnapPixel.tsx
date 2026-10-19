'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackSnapEvent } from '@/lib/snap-pixel';

export function SnapPixelTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastTrackedPath.current === pathname) return;

    lastTrackedPath.current = pathname;
    trackSnapEvent('PAGE_VIEW');
  }, [pathname]);

  return null;
}

export function SnapPixelViewContent({
  itemId,
  itemCategory,
}: {
  itemId: string;
  itemCategory?: string | null;
}) {
  useEffect(() => {
    if (!itemId) return;

    trackSnapEvent('VIEW_CONTENT', {
      item_ids: [itemId],
      ...(itemCategory ? { item_category: itemCategory } : {}),
    });
  }, [itemId, itemCategory]);

  return null;
}
