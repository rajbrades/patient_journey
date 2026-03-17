import type { ScoredTest } from '@/types';

const collectionLabels: Record<string, { label: string; icon: string }> = {
  'in-person': { label: 'In-Person Draw', icon: '🏥' },
  'at-home-blood': { label: 'At-Home Blood', icon: '🩸' },
  'at-home-saliva': { label: 'At-Home Saliva', icon: '🧪' },
  'at-home-blood-spot': { label: 'At-Home Blood Spot', icon: '💧' },
};

interface ResultsPanelProps {
  recommendations: ScoredTest[];
  onContinue: () => void;
}

export function ResultsPanel({ recommendations, onContinue }: ResultsPanelProps) {
  const top = recommendations.slice(0, 3);
  const rest = recommendations.slice(3);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Your Path to Better Health</h2>
        <p className="mt-2 text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
          Based on how you've been feeling, here are the tests that can help uncover what's really going on and get you back to feeling your best.
        </p>
      </div>

      {top.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-brand uppercase tracking-wide mb-4">
            Best Match for How You're Feeling
          </h3>
          <div className="space-y-4">
            {top.map((test, idx) => (
              <ResultCard key={test.slug} test={test} rank={idx + 1} highlighted />
            ))}
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Worth Exploring
          </h3>
          <div className="space-y-4">
            {rest.map((test, idx) => (
              <ResultCard key={test.slug} test={test} rank={top.length + idx + 1} />
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-10">
        <button
          type="button"
          onClick={onContinue}
          className="rounded-xl bg-brand px-10 py-4 text-base font-semibold text-white hover:bg-brand-dark transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/30 shadow-lg shadow-brand/20"
        >
          Take the Next Step
        </button>
        <p className="mt-3 text-sm text-gray-400" style={{ fontFamily: 'var(--font-inter)' }}>
          Share your info and our wellness team will walk you through your personalized plan.
        </p>
      </div>
    </div>
  );
}

function ResultCard({
  test,
  rank,
  highlighted = false,
}: {
  test: ScoredTest;
  rank: number;
  highlighted?: boolean;
}) {
  const collection = collectionLabels[test.collection_method] || {
    label: test.collection_method,
    icon: '🔬',
  };
  const price = test.price_cents ? `$${(test.price_cents / 100).toFixed(0)}` : null;

  return (
    <div
      className={`w-full rounded-2xl border p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${
        highlighted
          ? 'border-brand/30 bg-brand-light shadow-sm'
          : 'border-gray-100 bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              highlighted ? 'bg-brand text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {rank}
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900">{test.name}</h4>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                {collection.icon} {collection.label}
              </span>
              {test.test_group && (
                <span className="inline-flex rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                  {test.test_group.toUpperCase()}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>{test.description}</p>
            {test.personalizedRationale.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Why this matters for you
                </p>
                <ul className="space-y-1">
                  {test.personalizedRationale.slice(0, 3).map((r, i) => (
                    <li key={i} className="text-sm text-brand italic" style={{ fontFamily: 'var(--font-inter)' }}>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {test.not_for_you && (
              <details className="mt-3 group">
                <summary className="text-xs font-medium text-amber-700 cursor-pointer hover:text-amber-800 select-none">
                  This test may not be for you if…
                </summary>
                <p className="mt-1.5 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2" style={{ fontFamily: 'var(--font-inter)' }}>
                  {test.not_for_you}
                </p>
              </details>
            )}
          </div>
        </div>
        {price && (
          <div className="text-right shrink-0">
            <span className="text-2xl font-bold text-gray-900">{price}</span>
          </div>
        )}
      </div>
    </div>
  );
}
