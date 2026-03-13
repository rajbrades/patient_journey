export interface Goal {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
  category: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Test {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  biomarkers: string[];
  price_cents: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GoalTestMapping {
  id: string;
  goal_id: string;
  test_id: string;
  relevance: 'primary' | 'secondary';
  rationale: string | null;
  sort_order: number;
  created_at: string;
}

export interface GoalWithTests extends Goal {
  tests: (Test & { relevance: 'primary' | 'secondary'; rationale: string | null })[];
}
