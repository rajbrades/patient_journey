import type { GoalWithTests, QuizQuestion, QuizOption, ScoredTest, Test } from '@/types';

interface ScoringInput {
  answers: Record<string, string[]>;
  questions: QuizQuestion[];
  goalsWithTests: GoalWithTests[];
}

export function computeRecommendations(input: ScoringInput): ScoredTest[] {
  const { answers, questions, goalsWithTests } = input;

  // Stage A: Accumulate goal scores from answers
  const goalScores: Record<string, number> = {};
  const testBoosts: Record<string, number> = {};
  let collectionPreference: string | null = null;
  let budgetPreference: string | null = null;

  for (const question of questions) {
    const selectedIds = answers[question.id] || [];
    for (const optionId of selectedIds) {
      const option = question.options.find((o) => o.id === optionId);
      if (!option) continue;

      // Goal weights
      if (option.goalWeights) {
        for (const [goalSlug, weight] of Object.entries(option.goalWeights)) {
          goalScores[goalSlug] = (goalScores[goalSlug] || 0) + weight;
        }
      }

      // Direct test boosts (Q8 genetics)
      if (option.testBoosts) {
        for (const [testSlug, boost] of Object.entries(option.testBoosts)) {
          testBoosts[testSlug] = (testBoosts[testSlug] || 0) + boost;
        }
      }

      // Preference flags
      if (option.preferenceFlag && question.id === 'collection-preference') {
        collectionPreference = option.preferenceFlag;
      }
      if (option.preferenceFlag && question.id === 'budget') {
        budgetPreference = option.preferenceFlag;
      }
    }
  }

  // Stage B: Convert goal scores to test scores via mappings
  const testScoreMap: Record<string, { score: number; matchedGoals: string[]; rationale: string[] }> = {};
  const testDataMap: Record<string, Test> = {};

  for (const goal of goalsWithTests) {
    const gScore = goalScores[goal.slug] || 0;
    if (gScore === 0) continue;

    for (const test of goal.tests) {
      const relevanceMultiplier = test.relevance === 'primary' ? 2 : 1;
      const addition = gScore * relevanceMultiplier;

      if (!testScoreMap[test.slug]) {
        testScoreMap[test.slug] = { score: 0, matchedGoals: [], rationale: [] };
        testDataMap[test.slug] = test;
      }

      testScoreMap[test.slug].score += addition;
      testScoreMap[test.slug].matchedGoals.push(goal.name);
      if (test.rationale) {
        testScoreMap[test.slug].rationale.push(test.rationale);
      }
    }
  }

  // Stage C: Apply direct test boosts
  for (const [testSlug, boost] of Object.entries(testBoosts)) {
    if (!testScoreMap[testSlug]) {
      // Find test data from any goal mapping
      const testData = goalsWithTests
        .flatMap((g) => g.tests)
        .find((t) => t.slug === testSlug);
      if (testData) {
        testScoreMap[testSlug] = { score: 0, matchedGoals: [], rationale: [] };
        testDataMap[testSlug] = testData;
      }
    }
    if (testScoreMap[testSlug]) {
      testScoreMap[testSlug].score += boost;
    }
  }

  // Stage D: Apply collection preference multiplier
  if (collectionPreference && collectionPreference !== 'any') {
    for (const [testSlug, entry] of Object.entries(testScoreMap)) {
      const test = testDataMap[testSlug];
      if (!test) continue;

      if (collectionPreference === 'in-person' && test.collection_method === 'in-person') {
        entry.score *= 1.3;
      } else if (collectionPreference === 'at-home' && test.collection_method !== 'in-person') {
        entry.score *= 1.3;
      }
    }
  }

  // Stage E: Apply budget sorting preference
  const budgetCeiling = getBudgetCeiling(budgetPreference);

  // Build final ranked list
  const scoredTests: ScoredTest[] = Object.entries(testScoreMap)
    .map(([slug, entry]) => {
      const test = testDataMap[slug];
      return {
        ...test,
        slug,
        score: Math.round(entry.score * 10) / 10,
        matchedGoals: [...new Set(entry.matchedGoals)],
        personalizedRationale: [...new Set(entry.rationale)],
      } as ScoredTest;
    })
    .filter((t) => t.score > 0)
    .sort((a, b) => {
      // Budget-constrained: within-budget tests sort higher at equal scores
      if (budgetCeiling && a.score === b.score) {
        const aInBudget = (a.price_cents || 0) <= budgetCeiling;
        const bInBudget = (b.price_cents || 0) <= budgetCeiling;
        if (aInBudget && !bInBudget) return -1;
        if (!aInBudget && bInBudget) return 1;
      }
      return b.score - a.score;
    });

  return scoredTests;
}

function getBudgetCeiling(pref: string | null): number | null {
  switch (pref) {
    case 'low': return 30000;   // Under $300 — covers AHB panels
    case 'mid': return 70000;   // $300–$700 — covers 10X Gut Health Test, comprehensive, MGT, MitoScreen
    case 'high': return 100000; // $700–$1,000 — excludes PGT ($1,299)
    default: return null;       // unlimited — all tests eligible
  }
}

export function extractPreferences(
  answers: Record<string, string[]>,
  questions: QuizQuestion[]
): { collectionPreference: string | null; budgetPreference: string | null } {
  let collectionPreference: string | null = null;
  let budgetPreference: string | null = null;

  for (const question of questions) {
    const selectedIds = answers[question.id] || [];
    for (const optionId of selectedIds) {
      const option = question.options.find((o: QuizOption) => o.id === optionId);
      if (!option?.preferenceFlag) continue;
      if (question.id === 'collection-preference') collectionPreference = option.preferenceFlag;
      if (question.id === 'budget') budgetPreference = option.preferenceFlag;
    }
  }

  return { collectionPreference, budgetPreference };
}

export function extractGoalScores(
  answers: Record<string, string[]>,
  questions: QuizQuestion[]
): Record<string, number> {
  const goalScores: Record<string, number> = {};
  for (const question of questions) {
    const selectedIds = answers[question.id] || [];
    for (const optionId of selectedIds) {
      const option = question.options.find((o: QuizOption) => o.id === optionId);
      if (!option?.goalWeights) continue;
      for (const [goalSlug, weight] of Object.entries(option.goalWeights)) {
        goalScores[goalSlug] = (goalScores[goalSlug] || 0) + weight;
      }
    }
  }
  return goalScores;
}
