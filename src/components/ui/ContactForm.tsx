"use client";

import { useState, type ReactNode } from "react";
import { FORMSPREE_CONTACT } from "@/lib/formspree";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "hidden";
  required?: boolean;
  options?: string[];
  /** Display labels for select options (same order as options) */
  optionLabels?: string[];
};

type ContactFormProps = {
  fields: Field[];
  formName: string;
  submitLabel?: string;
  showRecaptchaNote?: boolean;
  defaultValues?: Record<string, string>;
  /** Extra content shown below the thank-you message after a successful submit. */
  successExtra?: ReactNode;
  successMessage?: string;
  /** When set, runs after Formspree succeeds instead of showing the inline thank-you card. */
  onSuccess?: (formData: FormData) => void | Promise<void>;
};

export function ContactForm({
  fields,
  formName,
  submitLabel = "Send",
  showRecaptchaNote = true,
  defaultValues,
  successExtra,
  successMessage = "Your message was sent successfully. Our team will get back to you soon.",
  onSuccess,
}: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const form = event.currentTarget;
    const body = new FormData(form);
    body.append("form_name", formName);
    body.append("_subject", `New Contact - ${formName}`);
    body.append("page", window.location.pathname);

    try {
      const response = await fetch(FORMSPREE_CONTACT, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const json = (await response.json().catch(() => ({}))) as {
          errors?: { message: string }[];
        };
        throw new Error(json.errors?.[0]?.message ?? "Unable to send your message right now.");
      }

      if (onSuccess) {
        await onSuccess(body);
      } else {
        setSubmitted(true);
        form.reset();
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send your message right now. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md rounded-sm border border-green-200 bg-green-50 px-5 py-6 text-center">
        <p className="font-heading text-lg font-semibold text-tamay-primary">Thank you!</p>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{successMessage}</p>
        {successExtra && <div className="mt-6">{successExtra}</div>}
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-semibold text-tamay-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
      {fields.map((field) =>
        field.type === "hidden" ? (
          <input
            key={field.name}
            type="hidden"
            name={field.name}
            value={defaultValues?.[field.name] ?? ""}
            readOnly
          />
        ) : (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-600">*</span>}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              rows={4}
              required={field.required}
              defaultValue={defaultValues?.[field.name]}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary"
            />
          ) : field.type === "select" && field.options ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              defaultValue={defaultValues?.[field.name] ?? ""}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary bg-white"
            >
              <option value="">Select...</option>
              {field.options.map((opt, i) => (
                <option key={opt} value={opt}>
                  {field.optionLabels?.[i] ?? opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              defaultValue={defaultValues?.[field.name]}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary"
            />
          )}
        </div>
        ),
      )}

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-tamay-primary hover:bg-tamay-primary-dark disabled:opacity-60 text-white font-bold py-3 text-sm tracking-wide transition-colors"
      >
        {submitting ? "Sending..." : submitLabel}
      </button>

      {showRecaptchaNote && (
        <p className="text-xs text-gray-500">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      )}
    </form>
  );
}
