"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchStaffSiteReviews,
  REVIEW_STATUS_OPTIONS,
  updateSiteReviewStatus,
  type ReviewStatus,
  type StaffSiteReview,
} from "@/lib/reviewSubmission";

const selectClass =
  "border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-tamay-primary/40 focus:border-tamay-primary";

function statusLabel(status: ReviewStatus): string {
  if (status === "published") return "Published";
  if (status === "rejected") return "Rejected";
  return "Pending";
}

function statusBadgeClass(status: ReviewStatus): string {
  if (status === "published") return "bg-green-100 text-green-800";
  if (status === "rejected") return "bg-red-100 text-red-800";
  return "bg-amber-100 text-amber-900";
}

export function StaffReviewsManager() {
  const [reviews, setReviews] = useState<StaffSiteReview[]>([]);
  const [filter, setFilter] = useState<"all" | ReviewStatus>("pending");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setReviews(await fetchStaffSiteReviews());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load reviews.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  const filtered = useMemo(() => {
    if (filter === "all") return reviews;
    return reviews.filter((review) => review.status === filter);
  }, [filter, reviews]);

  const handleStatusChange = async (reviewId: string, status: ReviewStatus) => {
    setUpdatingId(reviewId);
    setError(null);
    setSuccess(null);
    try {
      await updateSiteReviewStatus(reviewId, status);
      setReviews((prev) =>
        prev.map((review) => (review.id === reviewId ? { ...review, status } : review)),
      );
      setSuccess(`Review marked as ${statusLabel(status).toLowerCase()}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update review status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <label htmlFor="review-status-filter" className="block text-sm font-semibold text-gray-700 mb-2">
            Show
          </label>
          <select
            id="review-status-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value as "all" | ReviewStatus)}
            className={selectClass}
          >
            <option value="pending">Pending</option>
            <option value="published">Published</option>
            <option value="rejected">Rejected</option>
            <option value="all">All</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => void loadReviews()}
          className="text-sm font-semibold text-tamay-primary hover:underline self-start sm:self-end"
        >
          Refresh
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-700">{success}</p>}

      {loading ? (
        <p className="text-sm text-gray-600">Loading reviews...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-600">No reviews in this list.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((review) => (
            <li key={review.id} className="border border-gray-200 bg-gray-50 p-4 sm:p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900">{review.author_name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(review.created_at))}
                    {review.email ? ` · ${review.email}` : ""}
                    {` · ${review.rating}/5 stars`}
                  </p>
                </div>
                <span
                  className={`inline-flex self-start text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-sm ${statusBadgeClass(review.status)}`}
                >
                  {statusLabel(review.status)}
                </span>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{review.text}</p>

              <div>
                <label
                  htmlFor={`review-status-${review.id}`}
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Status
                </label>
                <select
                  id={`review-status-${review.id}`}
                  value={review.status}
                  disabled={updatingId === review.id}
                  onChange={(event) =>
                    void handleStatusChange(review.id, event.target.value as ReviewStatus)
                  }
                  className={`${selectClass} min-w-[160px]`}
                >
                  {REVIEW_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {statusLabel(option)}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
