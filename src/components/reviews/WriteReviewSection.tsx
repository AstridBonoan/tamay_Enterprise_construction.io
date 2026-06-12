"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GOOGLE_WRITE_REVIEW_URL, type ReviewSubmission } from "@/lib/reviewSubmission";

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  return (
    <div className="flex justify-center sm:justify-start gap-1" role="radiogroup" aria-label="Rating">
      {Array.from({ length: 5 }).map((_, index) => {
        const star = index + 1;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            onClick={() => onChange(star)}
            className={`text-2xl transition-colors ${
              star <= value ? "text-tamay-accent" : "text-gray-300 hover:text-tamay-accent/60"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

const emptyForm: ReviewSubmission = {
  name: "",
  email: "",
  rating: 5,
  text: "",
};

export function WriteReviewSection() {
  const [form, setForm] = useState<ReviewSubmission>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (patch: Partial<ReviewSubmission>) => {
    setForm((current) => ({ ...current, ...patch }));
  };

  const openGoogleReview = async () => {
    try {
      await navigator.clipboard.writeText(form.text.trim());
    } catch {
      // Clipboard may be blocked; Google tab still opens.
    }
    window.open(GOOGLE_WRITE_REVIEW_URL, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!form.text.trim()) {
      setError("Please write your review.");
      return;
    }
    if (form.rating < 1) {
      setError("Please select a star rating.");
      return;
    }

    setSubmitting(true);

    try {
      setSubmitted(true);
      await openGoogleReview();
    } catch {
      setError("Unable to open Google right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-14 bg-gray-50 px-4">
      <div className="max-w-2xl mx-auto">
        <SectionHeading
          title="Write A Review"
          subtitle="Share your experience with Tamay Enterprises. Draft your review here, then finish on Google so it appears on our Google profile and in our public review carousel."
        />

        <div className="mt-8 bg-white border border-gray-200 shadow-md rounded-sm p-6 sm:p-8">
          {submitted ? (
            <div className="text-center space-y-4">
              <p className="font-heading text-xl text-tamay-primary font-semibold">Thank you!</p>
              <p className="text-gray-600 leading-relaxed">
                A Google tab should have opened — paste your review there and submit it on Google to
                publish it publicly.
              </p>
              <p className="text-sm text-gray-500">
                Reviews shown on this website are pulled from Google after they are published there.
              </p>
              <button
                type="button"
                onClick={openGoogleReview}
                className="inline-block rounded-full bg-tamay-primary px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-tamay-primary-dark transition-colors"
              >
                Open Google Review Page
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="review-name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name<span className="text-red-600">*</span>
                </label>
                <input
                  id="review-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => update({ name: event.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary"
                />
              </div>

              <div>
                <label htmlFor="review-email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email (optional)
                </label>
                <input
                  id="review-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => update({ email: event.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary"
                />
              </div>

              <div>
                <p className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating<span className="text-red-600">*</span>
                </p>
                <StarPicker value={form.rating} onChange={(rating) => update({ rating })} />
              </div>

              <div>
                <label htmlFor="review-text" className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Review<span className="text-red-600">*</span>
                </label>
                <textarea
                  id="review-text"
                  name="review"
                  rows={5}
                  required
                  value={form.text}
                  onChange={(event) => update({ text: event.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tamay-primary"
                  placeholder="Tell us about your project experience..."
                />
              </div>

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
                {submitting ? "Opening Google..." : "Continue on Google"}
              </button>

              <p className="text-xs text-gray-500 leading-relaxed">
                We&apos;ll open Google in a new tab. Your review text will be copied to your clipboard
                when possible. Google requires reviews to be posted on their platform to appear publicly.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
