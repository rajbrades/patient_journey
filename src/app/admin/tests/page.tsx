'use client';

import { useEffect, useState } from 'react';
import type { Test } from '@/types';

export default function AdminTestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', slug: '', description: '', category: 'general',
    biomarkers: '', price_cents: '', collection_method: 'in-person', test_group: '',
  });
  const [showNew, setShowNew] = useState(false);

  async function fetchTests() {
    const res = await fetch('/api/admin/tests');
    setTests(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchTests();
  }, []);

  function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function formToPayload() {
    return {
      name: form.name,
      slug: form.slug || slugify(form.name),
      description: form.description,
      category: form.category,
      biomarkers: form.biomarkers.split(',').map((b) => b.trim()).filter(Boolean),
      price_cents: form.price_cents ? parseInt(form.price_cents, 10) : null,
      collection_method: form.collection_method,
      test_group: form.test_group || null,
    };
  }

  async function handleCreate() {
    const res = await fetch('/api/admin/tests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formToPayload()),
    });
    if (res.ok) {
      setShowNew(false);
      setForm({ name: '', slug: '', description: '', category: 'general', biomarkers: '', price_cents: '', collection_method: 'in-person', test_group: '' });
      fetchTests();
    }
  }

  async function handleUpdate(id: string) {
    const res = await fetch(`/api/admin/tests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formToPayload()),
    });
    if (res.ok) {
      setEditing(null);
      fetchTests();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this test?')) return;
    await fetch(`/api/admin/tests/${id}`, { method: 'DELETE' });
    fetchTests();
  }

  function startEdit(test: Test) {
    setEditing(test.id);
    setForm({
      name: test.name,
      slug: test.slug,
      description: test.description,
      category: test.category,
      biomarkers: test.biomarkers.join(', '),
      price_cents: test.price_cents?.toString() || '',
      collection_method: test.collection_method || 'in-person',
      test_group: test.test_group || '',
    });
  }

  const emptyForm = { name: '', slug: '', description: '', category: 'general', biomarkers: '', price_cents: '', collection_method: 'in-person', test_group: '' };

  const formFields = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
      <input placeholder="Slug (auto-generated)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
      <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
      <input placeholder="Price (cents)" value={form.price_cents} onChange={(e) => setForm({ ...form, price_cents: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" type="number" />
      <select value={form.collection_method} onChange={(e) => setForm({ ...form, collection_method: e.target.value })} className="rounded-lg border px-3 py-2 text-sm bg-white">
        <option value="in-person">In-Person Draw</option>
        <option value="at-home-blood">At-Home Blood</option>
        <option value="at-home-saliva">At-Home Saliva</option>
        <option value="at-home-blood-spot">At-Home Blood Spot</option>
      </select>
      <input placeholder="Test Group (e.g. ahb)" value={form.test_group} onChange={(e) => setForm({ ...form, test_group: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
      <input placeholder="Biomarkers (comma separated)" value={form.biomarkers} onChange={(e) => setForm({ ...form, biomarkers: e.target.value })} className="rounded-lg border px-3 py-2 text-sm sm:col-span-2" />
      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-lg border px-3 py-2 text-sm sm:col-span-2" rows={2} />
    </div>
  );

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-100 rounded-xl" />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lab Tests</h1>
        <button
          onClick={() => { setShowNew(true); setForm(emptyForm); }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          Add Test
        </button>
      </div>

      {showNew && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">New Test</h3>
          {formFields}
          <div className="mt-3 flex gap-2">
            <button onClick={handleCreate} className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700">Save</button>
            <button onClick={() => setShowNew(false)} className="rounded-lg bg-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-300">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {tests.map((test) => (
          <div key={test.id} className="rounded-xl border border-gray-200 bg-white p-4">
            {editing === test.id ? (
              <>
                {formFields}
                <div className="mt-3 flex gap-2">
                  <button onClick={() => handleUpdate(test.id)} className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700">Save</button>
                  <button onClick={() => setEditing(null)} className="rounded-lg bg-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-300">Cancel</button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{test.name}</h3>
                  <p className="text-sm text-gray-500">
                    {test.category} &middot; {test.biomarkers.length} biomarkers
                    {test.price_cents ? ` · $${(test.price_cents / 100).toFixed(0)}` : ''}
                    {' · '}{test.collection_method?.replace(/-/g, ' ') || 'in-person'}
                    {test.test_group ? ` · ${test.test_group.toUpperCase()}` : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(test)} className="text-sm text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(test.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
