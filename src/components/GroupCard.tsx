import { Group, Category } from '@/lib/types';
import { Users } from 'lucide-react';
import Link from 'next/link';

interface GroupCardProps {
  group: Group;
  category?: Category;
}

export function GroupCard({ group, category }: GroupCardProps) {
  // Internal landing page URL — uses slug if present, falls back to UUID
  const groupUrl = `/groups/${group.slug || group.id}`;

  return (
    <div className="bg-card backdrop-blur-md border border-border rounded-3xl p-6 hover:bg-white/5 transition-all hover:scale-[1.02] hover:border-white/20 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg line-clamp-1">{group.name}</h3>
        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="text-xs font-medium bg-white/10 border border-white/5 text-foreground px-3 py-1 rounded-full whitespace-nowrap ml-2 hover:bg-white/20 transition-colors"
          >
            {category.name}
          </Link>
        )}
      </div>
      <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
        {group.description}
      </p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 flex-wrap gap-3">
        <div className="flex items-center text-sm text-muted-foreground bg-white/5 px-3 py-2 rounded-full border border-white/5">
          <Users size={16} className="mr-1.5" />
          {group.member_count ? `${group.member_count.toLocaleString()}+` : 'Unknown'}
        </div>
        <Link
          href={groupUrl}
          className="flex items-center justify-center text-sm font-medium bg-primary text-primary-foreground px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex-1 sm:flex-none min-w-[120px]"
        >
          View Group
        </Link>
      </div>
    </div>
  );
}
