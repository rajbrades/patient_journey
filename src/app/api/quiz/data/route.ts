import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  const supabase = getSupabase();

  // Fetch all active goals
  const { data: goals, error: goalsError } = await supabase
    .from('goals')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (goalsError) {
    return NextResponse.json({ error: goalsError.message }, { status: 500 });
  }

  // Fetch all mappings with test data
  const { data: mappings, error: mappingsError } = await supabase
    .from('goal_test_mappings')
    .select('*, test:tests(*)')
    .order('sort_order');

  if (mappingsError) {
    return NextResponse.json({ error: mappingsError.message }, { status: 500 });
  }

  // Assemble GoalWithTests[]
  const goalsWithTests = (goals || []).map((goal) => {
    const goalMappings = (mappings || []).filter((m) => m.goal_id === goal.id);
    return {
      ...goal,
      tests: goalMappings
        .filter((m) => m.test && m.test.is_active)
        .map((m) => ({
          ...m.test,
          relevance: m.relevance,
          rationale: m.rationale,
        })),
    };
  });

  return NextResponse.json(goalsWithTests);
}
