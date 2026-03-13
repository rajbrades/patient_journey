'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Goal } from '@/types';

export default function AdminGoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', icon: '', category: 'general' });
  const [showNew, setShowNew] = useState(false);

  async function fetchGoals() {
    const res = await fetch('/api/admin/goals');
    setGoals(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchGoals();
  }, []);

  function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  async function handleCreate() {
    const res = await fetch('/api/admin/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, slug: form.slug || slugify(form.name) }),
    });
    if (res.ok) {
      setShowNew(false);
      setForm({ name: '', slug: '', description: '', icon: '', category: 'general' });
      fetchGoals();
    }
  }

  async function handleUpdate(id: string) {
    const res = await fetch(`/api/admin/goals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setEditing(null);
      fetchGoals();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this goal? This will also remove all test mappings.')) return;
    await fetch(`/api/admin/goals/${id}`, { method: 'DELETE' });
    fetchGoals();
  }

  function startEdit(goal: Goal) {
    setEditing(goal.id);
    setForm({
      name: goal.name,
      slug: goal.slug,
      description: goal.description,
      icon: goal.icon || '',
      category: goal.category,
    });
  }

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-100 rounded-xl" />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Health Goals</h1>
        <button
          onClick={() => {
            setShowNew(true);
            setForm({ name: '', slug: '', description: '', icon: '', category: 'general' });
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          Add Goal
        </button>
      </div>

      {showNew && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">New Goal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
            <input placeholder="Slug (auto-generated)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
            <input placeholder="Icon (emoji)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
            <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-lg border px-3 py-2 text-sm sm:col-span-2" rows={2} />
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={handleCreate} className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700">Save</button>
            <button onClick={() => setShowNew(false)} className="rounded-lg bg-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-300">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {goals.map((goal) => (
          <div key={goal.id} className="rounded-xl border border-gray-200 bg-white p-4">
            {editing === goal.id ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
                  <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
                  <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-lg border px-3 py-2 text-sm sm:col-span-2" rows={2} />
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => handleUpdate(goal.id)} className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700">Save</button>
                  <button onClick={() => setEditing(null)} className="rounded-lg bg-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-300">Cancel</button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                    <p className="text-sm text-gray-500">{goal.category} &middot; {goal.slug}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/goals/${goal.id}/mappings`} className="text-sm text-green-600 hover:underline">Manage Tests</Link>
                  <button onClick={() => startEdit(goal)} className="text-sm text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(goal.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
