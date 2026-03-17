import type { Metadata } from "next";
import QuizContainer from "./quiz-container";
import { BrandLogo } from "@/components/ui/brand-logo";

export const metadata: Metadata = {
  title: "Health Quiz | 10X Health",
  description:
    "Answer a few questions about how you feel and discover exactly what your body needs. No more guessing—get personalized recommendations backed by science.",
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
          <BrandLogo />
          <span className="text-sm text-gray-400">
            Find Your Path to Better Health
          </span>
        </div>
      </header>
      <QuizContainer />
    </main>
  );
}
