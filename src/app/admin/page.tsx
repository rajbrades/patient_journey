import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/goals"
          className="block rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-900">Health Goals</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage health goals that patients can browse and search.
          </p>
        </Link>
        <Link
          href="/admin/tests"
          className="block rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-900">Lab Tests</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage lab tests, biomarkers, and pricing.
          </p>
        </Link>
      </div>
    </div>
  );
}
