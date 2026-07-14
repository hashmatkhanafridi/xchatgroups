import { supabaseAdmin } from '@/lib/supabase';
import { Group, Category } from '@/lib/types';
import { AdminControls } from './AdminControls';

export const revalidate = 0; // Don't cache admin page

export default async function AdminPage() {
  const { data: groupsData, error } = await supabaseAdmin
    .from('groups')
    .select('*, categories(*)')
    .order('submitted_at', { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Error loading groups: {error.message}</div>;
  }

  const { data: categoriesData } = await supabaseAdmin
    .from('categories')
    .select('*')
    .order('name');

  const groups = groupsData as any[];
  const categories = categoriesData as Category[];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="bg-card border border-border rounded-xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="p-4 font-medium text-sm text-muted-foreground">Name</th>
              <th className="p-4 font-medium text-sm text-muted-foreground">Category</th>
              <th className="p-4 font-medium text-sm text-muted-foreground">Link</th>
              <th className="p-4 font-medium text-sm text-muted-foreground">Contact</th>
              <th className="p-4 font-medium text-sm text-muted-foreground">Status</th>
              <th className="p-4 font-medium text-sm text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No groups submitted yet.
                </td>
              </tr>
            ) : (
              groups.map((group) => (
                <tr key={group.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <div className="font-medium">{group.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs" title={group.description}>
                      {group.description}
                    </div>
                  </td>
                  <td className="p-4 text-sm">{group.categories?.name}</td>
                  <td className="p-4">
                    <a href={group.join_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                      Visit Link
                    </a>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{group.submitter_contact || 'N/A'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                      ${group.status === 'approved' ? 'bg-green-500/20 text-green-500' : ''}
                      ${group.status === 'pending' ? 'bg-blue-500/20 text-blue-500' : ''}
                      ${group.status === 'rejected' ? 'bg-yellow-500/20 text-yellow-500' : ''}
                      ${group.status === 'broken' ? 'bg-orange-500/20 text-orange-500' : ''}
                    `}>
                      {group.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <AdminControls group={group} categories={categories} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
