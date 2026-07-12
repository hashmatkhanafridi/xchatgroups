'use server';

import { supabase } from '@/lib/supabase';
import { headers } from 'next/headers';

// Simple in-memory store for rate limiting (Note: resets on server restart/redeploy, which is fine for basic V1)
// Key: IP address, Value: Array of submission timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX_SUBMISSIONS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Clean up old timestamps outside the window
  const recentTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (recentTimestamps.length >= RATE_LIMIT_MAX_SUBMISSIONS) {
    // Keep map updated
    rateLimitMap.set(ip, recentTimestamps);
    return false; // Rate limit exceeded
  }
  
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return true; // Allowed
}

export async function submitGroup(formData: FormData) {
  // 1. Honeypot Check (Bot Protection)
  const honeypot = formData.get('website_url') as string;
  if (honeypot) {
    // Silently return success to trick the bot, but don't save anything
    console.log('Blocked bot submission via honeypot');
    return { success: true };
  }

  // 2. Rate Limiting
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
  
  if (!checkRateLimit(ip)) {
    console.log(`Rate limit exceeded for IP: ${ip}`);
    return { error: 'You have submitted too many groups recently. Please try again later.' };
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const category_id = formData.get('category_id') as string;
  const join_link = formData.get('join_link') as string;
  const member_count_str = formData.get('member_count') as string;
  const submitter_contact = formData.get('submitter_contact') as string;

  if (!name || !description || !category_id || !join_link) {
    return { error: 'Missing required fields' };
  }

  const member_count = member_count_str ? parseInt(member_count_str, 10) : null;

  const { error } = await supabase.from('groups').insert({
    name,
    description,
    category_id,
    join_link,
    member_count,
    submitter_contact,
    status: 'pending',
  });

  if (error) {
    console.error('Error submitting group:', error);
    return { error: 'Failed to submit group. Please try again later.' };
  }

  // Not revalidating any public paths since it's 'pending'
  return { success: true };
}
