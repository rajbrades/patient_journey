import type { Test } from '@/types';

interface TestCardProps {
  test: Test & { relevance: 'primary' | 'secondary'; rationale: string | null };
}

const collectionLabels: Record<string, { label: string; icon: string }> = {
  'in-person': { label: 'In-Person Draw', icon: '🏥' },
  'at-home-blood': { label: 'At-Home Blood', icon: '🩸' },
  'at-home-saliva': { label: 'At-Home Saliva', icon: '🧪' },
  'at-home-blood-spot': { label: 'At-Home Blood Spot', icon: '💧' },
};

export function TestCard({ test }: TestCardProps) {
  const price = test.price_cents
    ? `$${(test.price_cents / 100).toFixed(0)}`
    : null;

  const collection = collectionLabels[test.collection_method] || {
    label: test.collection_method,
    icon: '🔬',
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                test.relevance === 'primary'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {test.relevance}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
              {collection.icon} {collection.label}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{test.description}</p>
          {test.rationale && (
            <p className="mt-2 text-sm font-medium text-blue-600 italic">
              {test.rationale}
            </p>
          )}
        </div>
        {price && (
          <div className="text-right shrink-0">
            <span className="text-2xl font-bold text-gray-900">{price}</span>
          </div>
        )}
      </div>
      {test.biomarkers.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {test.biomarkers.map((biomarker) => (
            <span
              key={biomarker}
              className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600 ring-1 ring-inset ring-gray-200"
            >
              {biomarker}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
