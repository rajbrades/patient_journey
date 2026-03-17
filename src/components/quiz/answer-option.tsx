interface AnswerOptionProps {
  label: string;
  description?: string;
  icon?: string;
  selected: boolean;
  onToggle: () => void;
}

export function AnswerOption({
  label,
  description,
  icon,
  selected,
  onToggle,
}: AnswerOptionProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative flex items-center gap-3 border-2 p-4 text-left transition-all duration-200 ${
        selected
          ? "border-brand bg-brand-light -translate-y-1 -translate-x-1 shadow-solid-brand z-10"
          : "border-black bg-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-solid hover:z-10"
      }`}
    >
      {icon && <span className="text-2xl shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        <span
          className={`text-sm font-medium ${selected ? "text-gray-900" : "text-gray-900"}`}
        >
          {label}
        </span>
        {description && (
          <p
            className={`text-xs mt-0.5 ${selected ? "text-brand" : "text-gray-500"}`}
          >
            {description}
          </p>
        )}
      </div>
      <div
        className={`shrink-0 flex h-5 w-5 items-center justify-center border-2 transition-all ${
          selected ? "border-brand bg-brand" : "border-black"
        }`}
      >
        {selected && (
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
