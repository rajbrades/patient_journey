import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = getSupabase();

  // Fetch goal
  const { data: goal, error: goalError } = await supabase
    .from('goals')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (goalError || !goal) {
    return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
  }

  // Fetch mapped tests
  const { data: mappings, error: mappingError } = await supabase
    .from('goal_test_mappings')
    .select('relevance, rationale, sort_order, test_id')
    .eq('goal_id', goal.id)
    .order('sort_order');

  if (mappingError) {
    return NextResponse.json({ error: mappingError.message }, { status: 500 });
  }

  const testIds = mappings?.map((m) => m.test_id) ?? [];

  const { data: tests, error: testError } = await supabase
    .from('tests')
    .select('*')
    .in('id', testIds)
    .eq('is_active', true);

  if (testError) {
    return NextResponse.json({ error: testError.message }, { status: 500 });
  }

  // Merge test data with mapping metadata
  const testsWithRelevance = mappings
    ?.map((m) => {
      const test = tests?.find((t) => t.id === m.test_id);
      if (!test) return null;
      return { ...test, relevance: m.relevance, rationale: m.rationale };
    })
    .filter(Boolean);

  return NextResponse.json({ ...goal, tests: testsWithRelevance });
}
