'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import type { GoalWithTests } from '@/types';
import { TestCard } from '@/components/patient/test-card';

export default function GoalDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [goal, setGoal] = useState<GoalWithTests | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGoal() {
      const res = await fetch(`/api/goals/${slug}`);
      if (res.ok) {
        setGoal(await res.json());
      }
      setLoading(false);
    }
    fetchGoal();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-6 w-96 bg-gray-100 rounded animate-pulse mb-8" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!goal) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Goal not found</h1>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Back to all goals
          </Link>
        </div>
      </main>
    );
  }

  const primaryTests = goal.tests.filter((t) => t.relevance === 'primary');
  const secondaryTests = goal.tests.filter((t) => t.relevance === 'secondary');

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All goals
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{goal.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{goal.name}</h1>
              <p className="mt-1 text-gray-500">{goal.description}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-8">
        {primaryTests.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tests That Can Help You Reach This Goal
            </h2>
            <div className="space-y-4">
              {primaryTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          </div>
        )}

        {secondaryTests.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Other Tests to Explore
            </h2>
            <div className="space-y-4">
              {secondaryTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
