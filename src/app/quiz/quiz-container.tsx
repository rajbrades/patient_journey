'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { GoalWithTests, ScoredTest } from '@/types';
import { quizQuestions } from '@/lib/quiz/questions';
import { computeRecommendations, extractPreferences, extractGoalScores } from '@/lib/quiz/scoring';
import { ProgressBar } from '@/components/quiz/progress-bar';
import { QuestionCard } from '@/components/quiz/question-card';
import { ResultsPanel } from '@/components/quiz/results-panel';
import { LeadCaptureForm } from '@/components/quiz/lead-capture-form';

type Phase = 'loading' | 'quiz' | 'results' | 'lead-capture' | 'thank-you';

export default function QuizContainer() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [goalsWithTests, setGoalsWithTests] = useState<GoalWithTests[]>([]);
  const [recommendations, setRecommendations] = useState<ScoredTest[]>([]);

  useEffect(() => {
    fetch('/api/quiz/data')
      .then((res) => res.json())
      .then((data) => {
        setGoalsWithTests(data);
        setPhase('quiz');
      });
  }, []);

  const currentQuestion = quizQuestions[step];
  const selectedForCurrent = answers[currentQuestion?.id] || [];

  function handleSelect(optionId: string) {
    const qId = currentQuestion.id;
    const current = answers[qId] || [];

    if (currentQuestion.type === 'single-select') {
      setAnswers({ ...answers, [qId]: [optionId] });
      return;
    }

    // Multi-select toggle
    if (current.includes(optionId)) {
      setAnswers({ ...answers, [qId]: current.filter((id) => id !== optionId) });
    } else {
      setAnswers({ ...answers, [qId]: [...current, optionId] });
    }
  }

  function handleNext() {
    if (step < quizQuestions.length - 1) {
      setStep(step + 1);
    } else {
      // Compute results
      const results = computeRecommendations({
        answers,
        questions: quizQuestions,
        goalsWithTests,
      });
      setRecommendations(results);
      setPhase('results');
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  async function handleLeadSubmit(data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }) {
    const { collectionPreference, budgetPreference } = extractPreferences(answers, quizQuestions);
    const goalScores = extractGoalScores(answers, quizQuestions);

    await fetch('/api/quiz/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        quiz_answers: answers,
        goal_scores: goalScores,
        recommended_test_ids: recommendations.map((t) => t.id),
        recommended_test_slugs: recommendations.map((t) => t.slug),
        collection_preference: collectionPreference,
        budget_preference: budgetPreference,
      }),
    });

    setPhase('thank-you');
  }

  if (phase === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-4" />
          <div className="h-4 w-64 bg-gray-100 rounded mx-auto" />
        </div>
      </div>
    );
  }

  if (phase === 'quiz') {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto mb-10">
          <ProgressBar currentStep={step + 1} totalSteps={quizQuestions.length} />
        </div>
        <QuestionCard
          question={currentQuestion}
          selectedAnswers={selectedForCurrent}
          onSelect={handleSelect}
          onNext={handleNext}
          onBack={handleBack}
          isFirst={step === 0}
          isLast={step === quizQuestions.length - 1}
        />
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div className="px-4 py-8">
        <ResultsPanel
          recommendations={recommendations}
          onContinue={() => setPhase('lead-capture')}
        />
      </div>
    );
  }

  if (phase === 'lead-capture') {
    return (
      <div className="px-4 py-8">
        <LeadCaptureForm onSubmit={handleLeadSubmit} />
      </div>
    );
  }

  // Thank you
  return (
    <div className="px-4 py-16 text-center max-w-lg mx-auto">
      <div className="mb-6 text-5xl">🎉</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Thank You!
      </h2>
      <p className="text-gray-500 mb-8">
        We&apos;ve received your results. A member of our team will reach out shortly with
        your personalized health plan and next steps.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          Explore Health Goals
        </Link>
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setStep(0);
            setRecommendations([]);
            setPhase('quiz');
          }}
          className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
