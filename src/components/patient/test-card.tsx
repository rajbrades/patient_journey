import type { Test } from "@/types";

interface TestCardProps {
  test: Test & { relevance: "primary" | "secondary"; rationale: string | null };
}

const collectionLabels: Record<string, { label: string; icon: string }> = {
  "in-person": { label: "In-Person Draw", icon: "🏥" },
  "at-home-blood": { label: "At-Home Blood", icon: "🩸" },
  "at-home-saliva": { label: "At-Home Saliva", icon: "🧪" },
  "at-home-blood-spot": { label: "At-Home Blood Spot", icon: "💧" },
};

export function TestCard({ test }: TestCardProps) {
  const price = test.price_cents
    ? `$${(test.price_cents / 100).toFixed(0)}`
    : null;

  const collection = collectionLabels[test.collection_method] || {
    label: test.collection_method,
    icon: "🔬",
  };

  return (
    <div className="w-full border-2 border-black bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-solid">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ${
                test.relevance === "primary"
                  ? "bg-brand-light text-brand"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {test.relevance === "primary" ? "best match" : "worth exploring"}
            </span>
            <span className="inline-flex items-center gap-1 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
              {collection.icon} {collection.label}
            </span>
          </div>
          <p
            className="mt-1 text-sm text-gray-500"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {test.description}
          </p>
          {test.rationale && (
            <p
              className="mt-2 text-sm font-medium text-brand italic"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {test.rationale}
            </p>
          )}
          {test.not_for_you && (
            <details className="mt-3 group">
              <summary className="text-xs font-medium text-amber-700 cursor-pointer hover:text-amber-800 select-none">
                This test may not be for you if…
              </summary>
              <p
                className="mt-1.5 text-sm text-amber-700 bg-amber-50 px-3 py-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {test.not_for_you}
              </p>
            </details>
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
              className="inline-flex items-center bg-gray-50 px-2 py-1 text-xs text-gray-600 ring-1 ring-inset ring-gray-200"
            >
              {biomarker}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
