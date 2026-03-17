import Link from "next/link";
import { GoalBrowser } from "@/components/patient/goal-browser";
import { BrandLogo } from "@/components/ui/brand-logo";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <BrandLogo />
          <span className="text-sm font-medium text-gray-400 max-sm:hidden">
            Stop Guessing, Start Knowing.
          </span>
        </div>
      </nav>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Stop guessing about your health. Start knowing.
          </h1>
          <p
            className="mt-2 text-lg text-gray-500"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Find the exact lab tests you need to take control of your health.
            Choose a goal below or take our quick quiz to get personalized
            recommendations.
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <Link
          href="/quiz"
          className="block bg-brand p-6 text-white max-sm:rounded-[5px] sm:rounded-[10px] hover:bg-brand-dark transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[20px] max-sm:text-[12px] font-heading uppercase font-bold text-white">Not sure where to start?</h2>
              <p
                className="mt-1 text-white/80"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Take our 2-minute quiz and discover exactly what your body
                needs—no more trial and error, just answers that work.
              </p>
            </div>
            <span className="text-3xl hidden sm:block">→</span>
          </div>
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Choose your health goal
          </h2>
          <p
            className="text-gray-600"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Select what matters most to you, and we&apos;ll recommend the right tests
            to get you there.
          </p>
        </div>
        <GoalBrowser />
      </section>
    </main>
  );
}
