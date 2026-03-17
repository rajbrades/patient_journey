"use client";

import Link from "next/link";
import type { Goal } from "@/types";

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  return (
    <Link
      href={`/goals/${goal.slug}`}
      className="group flex flex-col w-full h-full border-2 border-black bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-solid"
    >
      <div className="mb-3 text-3xl">{goal.icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand transition-colors duration-300">
        {goal.name}
      </h3>
      <p
        className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {goal.description}
      </p>
      <div className="mt-4 inline-flex items-center text-sm font-medium text-brand group-hover:text-brand-dark">
        See what tests can help
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
