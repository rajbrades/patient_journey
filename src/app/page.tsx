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

      <section className="max-w-6xl mx-auto px-4 py-8">
        <GoalBrowser />
      </section>
    </main>
  );
}
