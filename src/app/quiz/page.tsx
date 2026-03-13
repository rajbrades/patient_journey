import type { Metadata } from 'next';
import Link from 'next/link';
import QuizContainer from './quiz-container';

export const metadata: Metadata = {
  title: 'Health Quiz | 10X Health',
  description: 'Answer a few questions and get personalized lab test recommendations based on your health goals.',
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-900">
            10X Health
          </Link>
          <span className="text-sm text-gray-400">Health Assessment</span>
        </div>
      </header>
      <QuizContainer />
    </main>
  );
}
