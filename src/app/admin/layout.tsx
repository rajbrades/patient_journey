import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
          <Link href="/admin" className="text-lg font-bold text-gray-900">
            10X Admin
          </Link>
          <Link
            href="/admin/goals"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Goals
          </Link>
          <Link
            href="/admin/tests"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Tests
          </Link>
          <div className="ml-auto">
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              View Patient Site
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
