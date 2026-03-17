interface AnswerOptionProps {
  label: string;
  description?: string;
  icon?: string;
  selected: boolean;
  onToggle: () => void;
}

export function AnswerOption({ label, description, icon, selected, onToggle }: AnswerOptionProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
        selected
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {icon && <span className="text-2xl shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-medium ${selected ? 'text-blue-900' : 'text-gray-900'}`}>
          {label}
        </span>
        {description && (
          <p className={`text-xs mt-0.5 ${selected ? 'text-blue-600' : 'text-gray-500'}`}>
            {description}
          </p>
        )}
      </div>
      <div
        className={`shrink-0 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
          selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
        }`}
      >
        {selected && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  );
}
