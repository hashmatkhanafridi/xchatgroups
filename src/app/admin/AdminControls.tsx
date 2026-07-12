'use client';

import { useState } from 'react';
import { updateGroupStatus, deleteGroup } from './actions';
import { Check, X, Trash2, AlertTriangle } from 'lucide-react';

export function AdminControls({ groupId, currentStatus }: { groupId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  async function handleStatus(status: 'approved' | 'rejected' | 'broken') {
    setLoading(true);
    await updateGroupStatus(groupId, status);
    setLoading(false);
  }

  async function handleDelete() {
    if (confirm('Are you sure you want to completely delete this group?')) {
      setLoading(true);
      await deleteGroup(groupId);
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      {currentStatus !== 'approved' && (
        <button
          onClick={() => handleStatus('approved')}
          disabled={loading}
          className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-xl transition-colors"
          title="Approve"
        >
          <Check size={18} />
        </button>
      )}
      
      {currentStatus !== 'rejected' && (
        <button
          onClick={() => handleStatus('rejected')}
          disabled={loading}
          className="p-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 rounded-xl transition-colors"
          title="Reject"
        >
          <X size={18} />
        </button>
      )}
      
      {currentStatus !== 'broken' && (
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
        onClick={handleDelete}
        disabled={loading}
        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-colors ml-2"
        title="Delete Completely"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
