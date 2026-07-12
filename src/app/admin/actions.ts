'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function updateGroupStatus(id: string, status: 'approved' | 'rejected' | 'broken') {
  const { error } = await supabaseAdmin
    .from('groups')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error updating status:', error);
    return { error: 'Failed to update status' };
  }

  revalidatePath('/');
  revalidatePath('/category/[slug]', 'page');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteGroup(id: string) {
  const { error } = await supabaseAdmin
    .from('groups')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting group:', error);
    return { error: 'Failed to delete group' };
  }

  revalidatePath('/');
  revalidatePath('/category/[slug]', 'page');
  revalidatePath('/admin');
  return { success: true };
}
