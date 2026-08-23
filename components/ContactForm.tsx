"use client";

import { useState, type FormEvent } from "react";

export const SUPPORT_EMAIL = "orynthis@gmail.com";

/**
 * There is no server here yet, so the form does not pretend to send anything.
 * It composes the message and hands it to the visitor's mail client, which is
 * the one delivery route that cannot silently fail.
 * ponytail: swap the submit handler for a POST when an API route exists.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const order = String(f.get("order") || "").trim();

    const body = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      order && `Order number: ${order}`,
      "",
      String(f.get("message") || ""),
    ]
      .filter(Boolean)
      .join("\n");

    const subject = order ? `Order ${order}` : `Question from ${f.get("name")}`;

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="border border-hairline bg-paper-alt p-6 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Your name" required />
        <Field name="email" label="Email" type="email" required />
      </div>

      <div className="mt-6">
        <Field name="order" label="Order number" hint="Optional" />
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="t-label text-graphite">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="mt-2 w-full resize-y border-b border-hairline bg-transparent py-2.5 leading-relaxed outline-none focus:border-accent"
        />
      </div>

      <button type="submit" className="btn btn-ink mt-8 w-full sm:w-auto">
        <span>Open in your mail app</span>
      </button>

      {sent ? (
        <p className="mt-4 text-sm text-graphite" role="status">
          Your mail app should be opening with the message ready. If nothing
          happened, write to{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-accent-text underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          directly.
        </p>
      ) : (
        <p className="mt-4 text-sm text-graphite">
          This opens your own email client with everything filled in, so you
          keep a copy of what you sent.
        </p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  hint,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="t-label text-graphite">
        {label}
        {hint && <span className="ml-2 normal-case opacity-70">{hint}</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-hairline bg-transparent py-2.5 outline-none focus:border-accent"
      />
    </div>
  );
}
