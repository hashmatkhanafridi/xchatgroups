'use client';

import { useState } from 'react';
import { Category } from '@/lib/types';
import { submitGroup } from './actions';

export function SubmitForm({ categories }: { categories: Category[] }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function clientSubmit(formData: FormData) {
    setStatus('submitting');
    setErrorMessage('');
    
    const result = await submitGroup(formData);
    
    if (result?.error) {
      setErrorMessage(result.error);
      setStatus('error');
    } else if (result?.success) {
      setStatus('success');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-primary/20 border border-primary/50 text-foreground p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-2 text-primary">Group Submitted Successfully!</h3>
        <p className="text-muted-foreground mb-4">
          Thank you for submitting. Our team will review the group to ensure it meets our guidelines before it appears in the directory.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-primary hover:underline font-medium"
        >
          Submit another group
        </button>
      </div>
    );
  }

  return (
    <form action={clientSubmit} className="space-y-6">
      {status === 'error' && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg">
          {errorMessage}
        </div>
      )}
      
      <div className="space-y-4">
        {/* Honeypot field - visually hidden, but bots will fill it */}
        <div aria-hidden="true" className="absolute opacity-0 -z-50 pointer-events-none w-0 h-0 overflow-hidden">
          <label htmlFor="website_url">Website URL</label>
          <input 
            type="text" 
            id="website_url" 
            name="website_url" 
            tabIndex={-1} 
            autoComplete="off" 
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Group Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="w-full bg-white/5 border border-border rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g., Global Traders X"
          />
        </div>
        
        <div>
          <label htmlFor="join_link" className="block text-sm font-medium mb-1">XChat Join Link *</label>
          <input 
            type="url" 
            id="join_link" 
            name="join_link" 
            required 
            className="w-full bg-white/5 border border-border rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="https://x.com/messages/join/..."
          />
        </div>

        <div>
          <label htmlFor="category_id" className="block text-sm font-medium mb-1">Category *</label>
          <select 
            id="category_id" 
            name="category_id" 
            required
            className="w-full bg-white/5 border border-border rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            defaultValue=""
          >
            <option value="" disabled className="bg-background text-foreground">Select a category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id} className="bg-background text-foreground">{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description *</label>
          <textarea 
            id="description" 
            name="description" 
            required 
            rows={4}
            className="w-full bg-white/5 border border-border rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="What is this group about? Who should join?"
          ></textarea>
        </div>

        <div>
          <label htmlFor="member_count" className="block text-sm font-medium mb-1">Estimated Member Count (Optional)</label>
          <input 
            type="number" 
            id="member_count" 
            name="member_count"
            min="1"
            className="w-full bg-white/5 border border-border rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g., 500"
          />
        </div>

        <div>
          <label htmlFor="submitter_contact" className="block text-sm font-medium mb-1">Your Contact / X Handle (Optional)</label>
          <p className="text-xs text-muted-foreground mb-2">Used only if we need to verify the group. Not shown publicly.</p>
          <input 
            type="text" 
            id="submitter_contact" 
            name="submitter_contact" 
            className="w-full bg-white/5 border border-border rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="e.g., @hashmatkhanafridi"
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full bg-primary text-primary-foreground font-medium py-3.5 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Group for Review'}
      </button>
    </form>
  );
}
