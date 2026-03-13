import Link from 'next/link';
import { GoalBrowser } from '@/components/patient/goal-browser';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What&apos;s your health goal?
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Select a goal and we&apos;ll recommend the right lab tests for you.
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <Link
          href="/quiz"
          className="block rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white shadow-lg shadow-blue-600/20 hover:from-blue-700 hover:to-blue-800 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Not sure where to start?</h2>
              <p className="mt-1 text-blue-100">
                Take our 2-minute health quiz and get personalized test recommendations.
              </p>
            </div>
            <span className="text-3xl hidden sm:block">→</span>
          </div>
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <GoalBrowser />
      </section>
    </main>
  );
}
