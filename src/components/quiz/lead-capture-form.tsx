"use client";

import { useState } from "react";

interface LeadCaptureFormProps {
  onSubmit: (data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }) => Promise<void>;
}

export function LeadCaptureForm({ onSubmit }: LeadCaptureFormProps) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.first_name.trim()) errs.first_name = "First name is required";
    if (!form.last_name.trim()) errs.last_name = "Last name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full border-2 px-4 py-3 text-sm focus:outline-none focus:border-brand transition-all duration-200 focus:-translate-y-1 focus:-translate-x-1 focus:shadow-solid-brand ${
      hasError ? "border-red-500" : "border-black"
    }`;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Ready to Feel Better?
        </h2>
        <p
          className="mt-2 text-gray-500"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Share your contact info and our wellness team will help you take the
          next step toward the answers you&apos;ve been looking for.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name *
            </label>
            <input
              id="first_name"
              type="text"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              className={inputClass(!!errors.first_name)}
              placeholder="John"
            />
            {errors.first_name && (
              <p className="mt-1 text-xs text-red-500">{errors.first_name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name *
            </label>
            <input
              id="last_name"
              type="text"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              className={inputClass(!!errors.last_name)}
              placeholder="Doe"
            />
            {errors.last_name && (
              <p className="mt-1 text-xs text-red-500">{errors.last_name}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass(!!errors.email)}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border-2 border-black px-4 py-3 text-sm focus:outline-none focus:border-brand transition-all duration-200 focus:-translate-y-1 focus:-translate-x-1 focus:shadow-solid-brand"
            placeholder="(555) 123-4567"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full border-2 border-brand bg-brand px-6 py-4 text-base font-semibold text-white hover:bg-brand-dark transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-solid-brand disabled:opacity-60 disabled:translate-y-0 disabled:translate-x-0 disabled:shadow-none"
        >
          {submitting ? "Sending..." : "Get My Personalized Plan"}
        </button>
      </form>
    </div>
  );
}
