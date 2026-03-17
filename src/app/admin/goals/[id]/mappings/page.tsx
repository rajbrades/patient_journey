"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Goal, Test, GoalTestMapping } from "@/types";

interface MappingWithTest extends GoalTestMapping {
  test: Test;
}

export default function GoalMappingsPage() {
  const { id: goalId } = useParams<{ id: string }>();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [mappings, setMappings] = useState<MappingWithTest[]>([]);
  const [allTests, setAllTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const [form, setForm] = useState({
    test_id: "",
    relevance: "primary" as "primary" | "secondary",
    rationale: "",
  });

  async function fetchData() {
    const [goalsRes, mappingsRes, testsRes] = await Promise.all([
      fetch("/api/admin/goals"),
      fetch(`/api/admin/mappings?goal_id=${goalId}`),
      fetch("/api/admin/tests"),
    ]);
    const goals: Goal[] = await goalsRes.json();
    const currentGoal = goals.find((g) => g.id === goalId) ?? null;
    setGoal(currentGoal);
    setMappings(await mappingsRes.json());
    setAllTests(await testsRes.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goalId]);

  const mappedTestIds = new Set(mappings.map((m) => m.test_id));
  const availableTests = allTests.filter((t) => !mappedTestIds.has(t.id));

  async function handleAdd() {
    if (!form.test_id) return;
    const res = await fetch("/api/admin/mappings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        goal_id: goalId,
        test_id: form.test_id,
        relevance: form.relevance,
        rationale: form.rationale || null,
        sort_order: mappings.length + 1,
      }),
    });
    if (res.ok) {
      setShowAdd(false);
      setForm({ test_id: "", relevance: "primary", rationale: "" });
      fetchData();
    }
  }

  async function handleUpdate(mappingId: string) {
    const res = await fetch(`/api/admin/mappings/${mappingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        relevance: form.relevance,
        rationale: form.rationale || null,
      }),
    });
    if (res.ok) {
      setEditing(null);
      fetchData();
    }
  }

  async function handleDelete(mappingId: string) {
    if (!confirm("Remove this test from the goal?")) return;
    await fetch(`/api/admin/mappings/${mappingId}`, { method: "DELETE" });
    fetchData();
  }

  async function handleReorder(mappingId: string, direction: "up" | "down") {
    const idx = mappings.findIndex((m) => m.id === mappingId);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= mappings.length) return;

    await Promise.all([
      fetch(`/api/admin/mappings/${mappings[idx].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: swapIdx + 1 }),
      }),
      fetch(`/api/admin/mappings/${mappings[swapIdx].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: idx + 1 }),
      }),
    ]);
    fetchData();
  }

  function startEdit(mapping: MappingWithTest) {
    setEditing(mapping.id);
    setForm({
      test_id: mapping.test_id,
      relevance: mapping.relevance,
      rationale: mapping.rationale || "",
    });
  }

  if (loading) {
    return <div className="animate-pulse h-64 bg-gray-100 " />;
  }

  if (!goal) {
    return <p className="text-gray-500">Goal not found.</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/goals"
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Back to Goals
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{goal.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{goal.name}</h1>
            <p className="text-sm text-gray-500">
              Manage recommended tests for this goal
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setShowAdd(true);
            setForm({ test_id: "", relevance: "primary", rationale: "" });
          }}
          disabled={availableTests.length === 0}
          className=" bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Test
        </button>
      </div>

      {showAdd && (
        <div className="mb-6  border border-blue-200 bg-blue-50 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Add Test Mapping</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={form.test_id}
              onChange={(e) => setForm({ ...form, test_id: e.target.value })}
              className=" border px-3 py-2 text-sm bg-white"
            >
              <option value="">Select a test...</option>
              {availableTests.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <select
              value={form.relevance}
              onChange={(e) =>
                setForm({
                  ...form,
                  relevance: e.target.value as "primary" | "secondary",
                })
              }
              className=" border px-3 py-2 text-sm bg-white"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
            <textarea
              placeholder="Rationale — why is this test relevant?"
              value={form.rationale}
              onChange={(e) => setForm({ ...form, rationale: e.target.value })}
              className=" border px-3 py-2 text-sm sm:col-span-2"
              rows={2}
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleAdd}
              disabled={!form.test_id}
              className=" bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className=" bg-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {mappings.length === 0 ? (
        <div className=" border-2 border-dashed border-gray-300 p-8 text-center text-gray-500">
          No tests mapped to this goal yet. Click &quot;Add Test&quot; to get
          started.
        </div>
      ) : (
        <div className="space-y-3">
          {mappings.map((mapping, idx) => (
            <div
              key={mapping.id}
              className=" border border-gray-200 bg-white p-4"
            >
              {editing === mapping.id ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className=" border bg-gray-50 px-3 py-2 text-sm text-gray-600">
                      {mapping.test.name}
                    </div>
                    <select
                      value={form.relevance}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          relevance: e.target.value as "primary" | "secondary",
                        })
                      }
                      className=" border px-3 py-2 text-sm bg-white"
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                    </select>
                    <textarea
                      value={form.rationale}
                      onChange={(e) =>
                        setForm({ ...form, rationale: e.target.value })
                      }
                      className=" border px-3 py-2 text-sm sm:col-span-2"
                      rows={2}
                      placeholder="Rationale"
                    />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleUpdate(mapping.id)}
                      className=" bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className=" bg-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => handleReorder(mapping.id, "up")}
                        disabled={idx === 0}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs leading-none"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleReorder(mapping.id, "down")}
                        disabled={idx === mappings.length - 1}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-25 text-xs leading-none"
                      >
                        ▼
                      </button>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {mapping.test.name}
                        </h3>
                        <span
                          className={`inline-block  px-2 py-0.5 text-xs font-medium ${
                            mapping.relevance === "primary"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {mapping.relevance}
                        </span>
                      </div>
                      {mapping.rationale && (
                        <p className="text-sm text-gray-500 mt-0.5">
                          {mapping.rationale}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(mapping)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(mapping.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
