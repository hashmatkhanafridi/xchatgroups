import { headers } from 'next/headers';
import { createHash, timingSafeEqual } from 'node:crypto';

/** Authorize at the data boundary as well as in middleware. */
export function requireAdmin(): void {
  const password = process.env.ADMIN_PASSWORD;
  const authorization = headers().get('authorization');
  const match = authorization?.match(/^Basic ([A-Za-z0-9+/]+={0,2})$/i);
  if (!password || !match) throw new Error('Unauthorized');

  const credentials = Buffer.from(match[1], 'base64').toString('utf8');
  const digest = (value: string) => createHash('sha256').update(value).digest();
  if (!timingSafeEqual(digest(credentials), digest(`admin:${password}`))) {
    throw new Error('Unauthorized');
  }
}
