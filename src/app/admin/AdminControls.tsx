'use client';

import { useState } from 'react';
import { updateGroupStatus, deleteGroup, updateGroupDetails } from './actions';
import { Check, X, Trash2, AlertTriangle, Pencil } from 'lucide-react';
import { Group, Category } from '@/lib/types';

export function AdminControls({ group, categories }: { group: any, categories: Category[] }) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: group.name,
    description: group.description,
    join_link: group.join_link,
    category_id: group.category_id,
    member_count: group.member_count || '',
  });

  async function handleStatus(status: 'approved' | 'rejected' | 'broken') {
    setLoading(true);
    await updateGroupStatus(group.id, status);
    setLoading(false);
  }

  async function handleDelete() {
    if (confirm('Are you sure you want to completely delete this group?')) {
      setLoading(true);
      await deleteGroup(group.id);
      setLoading(false);
    }
  }

  async function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await updateGroupDetails(group.id, {
      ...editForm,
      member_count: editForm.member_count ? parseInt(editForm.member_count as string) : null,
    });
    setIsEditing(false);
    setLoading(false);
  }

  return (
    <>
      <div className="flex gap-2">
        {group.status !== 'approved' && (
          <button
            onClick={() => handleStatus('approved')}
            disabled={loading}
            className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-xl transition-colors"
            title="Approve"
          >
            <Check size={18} />
          </button>
        )}
        
        {group.status !== 'rejected' && (
          <button
            onClick={() => handleStatus('rejected')}
            disabled={loading}
            className="p-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 rounded-xl transition-colors"
            title="Reject"
          >
            <X size={18} />
          </button>
        )}
        
        {group.status !== 'broken' && (
          <button
            onClick={() => handleStatus('broken')}
            disabled={loading}
            className="p-2 bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 rounded-xl transition-colors"
            title="Mark as Broken"
          >
            <AlertTriangle size={18} />
          </button>
        )}

        <button
          onClick={() => setIsEditing(true)}
          disabled={loading}
          className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-xl transition-colors"
          title="Edit Group"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-colors ml-2"
          title="Delete Completely"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border p-6 rounded-3xl w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Edit Group</h3>
              <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium mb-1">Group Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Join Link</label>
                <input
                  type="url"
                  required
                  value={editForm.join_link}
                  onChange={e => setEditForm({...editForm, join_link: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  required
                  value={editForm.category_id}
                  onChange={e => setEditForm({...editForm, category_id: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors appearance-none"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id} className="bg-background text-foreground">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Member Count (Optional)</label>
                <input
                  type="number"
                  value={editForm.member_count}
                  onChange={e => setEditForm({...editForm, member_count: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  required
                  rows={4}
                  value={editForm.description}
                  onChange={e => setEditForm({...editForm, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
