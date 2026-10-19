export type SnapEventName = 'PAGE_VIEW' | 'VIEW_CONTENT' | 'ADD_CART' | 'PURCHASE';

export interface SnapEventParams {
  price?: number;
  currency?: string;
  transaction_id?: string;
  item_ids?: string[];
  item_category?: string;
  number_items?: number;
  uuid_c1?: string;
  user_email?: string;
  user_phone_number?: string;
  user_hashed_email?: string;
  user_hashed_phone_number?: string;
}

type SnaptrFunction = {
  (command: 'init', pixelId: string): void;
  (command: 'track', event: SnapEventName): void;
  (command: 'track', event: SnapEventName, params: SnapEventParams): void;
  queue: unknown[][];
  handleRequest?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    snaptr?: SnaptrFunction;
    __xchatSnapPixelInitialized?: boolean;
  }
}

const SNAP_PIXEL_ID = '473db42f-19cf-4df8-87c5-1a63292b2b50';

function ensureSnapPixel() {
  if (typeof window === 'undefined') return;

  if (!window.snaptr) {
    const snaptr = function (...args: unknown[]) {
      if (snaptr.handleRequest) {
        snaptr.handleRequest.apply(snaptr, args);
      } else {
        snaptr.queue.push(args);
      }
    } as SnaptrFunction;

    snaptr.queue = [];
    window.snaptr = snaptr;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://sc-static.net/scevent.min.js';
    const firstScript = document.getElementsByTagName('script')[0];

    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  if (!window.__xchatSnapPixelInitialized) {
    window.snaptr('init', SNAP_PIXEL_ID);
    window.__xchatSnapPixelInitialized = true;
  }
}

export function trackSnapEvent(event: SnapEventName, params?: SnapEventParams) {
  ensureSnapPixel();
  if (!window.snaptr) return;

  if (params) {
    window.snaptr('track', event, params);
  } else {
    window.snaptr('track', event);
  }
}
