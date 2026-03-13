'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Goal } from '@/types';
import { GoalCard } from './goal-card';
import { SearchInput } from '../ui/search-input';

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'vitality', label: 'Vitality' },
  { value: 'hormones', label: 'Hormones' },
  { value: 'digestive', label: 'Digestive' },
  { value: 'performance', label: 'Performance' },
  { value: 'metabolism', label: 'Metabolism' },
  { value: 'immune', label: 'Immune' },
  { value: 'cardiovascular', label: 'Heart' },
  { value: 'cognitive', label: 'Cognitive' },
  { value: 'longevity', label: 'Longevity' },
];

export function GoalBrowser() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    async function fetchGoals() {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category) params.set('category', category);

      const res = await fetch(`/api/goals?${params}`);
      const data = await res.json();
      setGoals(data);
      setLoading(false);
    }
    fetchGoals();
  }, [search, category]);

  const handleSearch = useCallback((query: string) => {
    setSearch(query);
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <SearchInput onSearch={handleSearch} />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === cat.value
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-44 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : goals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No goals found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  );
}
