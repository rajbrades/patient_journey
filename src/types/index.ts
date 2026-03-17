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
  collection_method:
    | "in-person"
    | "at-home-blood"
    | "at-home-saliva"
    | "at-home-blood-spot";
  test_group: string | null;
  not_for_you: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GoalTestMapping {
  id: string;
  goal_id: string;
  test_id: string;
  relevance: "primary" | "secondary";
  rationale: string | null;
  sort_order: number;
  created_at: string;
}

export interface GoalWithTests extends Goal {
  tests: (Test & {
    relevance: "primary" | "secondary";
    rationale: string | null;
  })[];
}

// Quiz types

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  type: "single-select" | "multi-select";
  maxSelections?: number;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  goalWeights?: Record<string, number>;
  testBoosts?: Record<string, number>;
  preferenceFlag?: string;
}

export interface QuizState {
  answers: Record<string, string[]>;
  collectionPreference: string | null;
  budgetPreference: string | null;
}

export interface ScoredTest extends Test {
  score: number;
  matchedGoals: string[];
  personalizedRationale: string[];
}

export interface QuizLead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  quiz_answers: Record<string, string[]>;
  goal_scores: Record<string, number>;
  recommended_test_ids: string[];
  recommended_test_slugs: string[];
  collection_preference: string | null;
  budget_preference: string | null;
  created_at: string;
}
