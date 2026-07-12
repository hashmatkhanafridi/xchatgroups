import { supabase } from '@/lib/supabase';
import { GroupCard } from '@/components/GroupCard';
import { Group, Category } from '@/lib/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Fetch category
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (categoryError || !categoryData) {
    notFound();
  }

  const category = categoryData as Category;

  // Fetch groups in this category
  const { data: groupsData, error: groupsError } = await supabase
    .from('groups')
    .select('*')
    .eq('category_id', category.id)
    .eq('status', 'approved')
    .order('submitted_at', { ascending: false });

  const groups = (groupsData || []) as Group[];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-primary hover:underline mb-4 inline-block">
          &larr; Back to all categories
        </Link>
        <h1 className="text-3xl font-bold mb-2">{category.name} Groups</h1>
        <p className="text-muted-foreground">
          Browse and join {groups.length} active XChat {groups.length === 1 ? 'group' : 'groups'} in {category.name}.
        </p>
      </div>

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard 
              key={group.id} 
              group={group} 
              category={category} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 border-dashed">
          <p className="text-muted-foreground mb-4">No groups found in this category yet.</p>
          <Link href="/submit" className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 inline-block">
            Be the first to submit a group
          </Link>
        </div>
      )}
    </div>
  );
}
