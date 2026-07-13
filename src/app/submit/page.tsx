import { supabase } from '@/lib/supabase';
import { SubmitForm } from './SubmitForm';
import { Category } from '@/lib/types';

export default async function SubmitPage() {
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*')
    .order('name');
    
  const categories = (categoriesData || []) as Category[];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Submit an XChat Group</h1>
        <p className="text-muted-foreground text-balance">
          Want to grow your XChat group? Add it to the directory. All submissions are reviewed by our moderation team before becoming publicly visible to ensure quality and prevent spam.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl p-5 sm:p-6 md:p-8 rounded-[2rem] md:rounded-3xl border border-white/10 shadow-xl">
        <SubmitForm categories={categories} />
      </div>
    </div>
  );
}
