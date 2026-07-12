export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category_id: string;
  join_link: string;
  member_count: number | null;
  status: 'pending' | 'approved' | 'rejected' | 'broken';
  submitted_at: string;
  last_verified_at: string | null;
  submitter_contact: string | null;
  report_count: number;
}
