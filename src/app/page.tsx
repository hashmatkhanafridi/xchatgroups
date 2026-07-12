import { supabase } from '@/lib/supabase';
import { GroupCard } from '@/components/GroupCard';
import { Group, Category } from '@/lib/types';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every minute

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data as Category[];
}

async function getRecentGroups() {
  const { data, error } = await supabase
    .from('groups')
    .select('*, categories(*)')
    .eq('status', 'approved')
    .order('submitted_at', { ascending: false })
    .limit(6);
  
  if (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
  return data;
}

export default async function Home() {
  const [categories, recentGroups] = await Promise.all([
    getCategories(),
    getRecentGroups()
  ]);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="bg-muted/30 border-b border-border py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Find the Best <span className="text-primary">XChat</span> Groups
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            The unofficial directory for X Corp&apos;s XChat messaging app. Discover active communities, network with like-minded people, and join the conversation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#categories" className="bg-white/10 backdrop-blur-md border border-white/10 text-foreground px-8 py-3.5 rounded-full font-medium hover:bg-white/20 transition-all w-full sm:w-auto">
              Browse Categories
            </Link>
            <Link href="/submit" className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 w-full sm:w-auto">
              Submit a Group
            </Link>
          </div>
        </div>
      </section>

      {/* Featured/Recent Groups */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Recently Added</h2>
        </div>
        
        {recentGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentGroups.map((group) => (
              <GroupCard 
                key={group.id} 
                group={group as unknown as Group} 
                category={group.categories as unknown as Category} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-xl border border-border border-dashed">
            <p className="text-muted-foreground">No groups have been added yet.</p>
          </div>
        )}
      </section>

      {/* Categories Grid */}
      <section id="categories" className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.slug}`}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] transition-all text-center group"
            >
              <h3 className="font-medium group-hover:text-primary transition-colors">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
