import type { QuizQuestion } from '@/types';
import { AnswerOption } from './answer-option';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswers: string[];
  onSelect: (answerId: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function QuestionCard({
  question,
  selectedAnswers,
  onSelect,
  onNext,
  onBack,
  isFirst,
  isLast,
}: QuestionCardProps) {
  const canProceed = selectedAnswers.length > 0;
  const atMax = question.maxSelections ? selectedAnswers.length >= question.maxSelections : false;

  function handleToggle(optionId: string) {
    if (question.type === 'single-select') {
      onSelect(optionId);
      return;
    }
    if (selectedAnswers.includes(optionId)) {
      onSelect(optionId);
    } else if (!atMax) {
      onSelect(optionId);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{question.question}</h2>
        {question.subtitle && (
          <p className="mt-2 text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>{question.subtitle}</p>
        )}
        {question.type === 'multi-select' && atMax && (
          <p className="mt-1 text-sm text-amber-600 font-medium">
            Maximum {question.maxSelections} selected
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswers.includes(option.id);
          const isDisabled = !isSelected && atMax;
          return (
            <div key={option.id} className={isDisabled ? 'opacity-50 pointer-events-none' : ''}>
              <AnswerOption
                label={option.label}
                description={option.description}
                icon={option.icon}
                selected={isSelected}
                onToggle={() => handleToggle(option.id)}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        {!isFirst ? (
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 transition duration-300"
          >
            Back
          </button>
        ) : (
          <div />
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="rounded-xl bg-brand px-8 py-3 text-sm font-medium text-white hover:bg-brand-dark transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        >
          {isLast ? 'Show Me What I Need' : 'Next'}
        </button>
      </div>
    </div>
  );
}
