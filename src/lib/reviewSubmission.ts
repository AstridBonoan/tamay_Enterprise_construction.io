import { createClient } from "@/lib/supabase/client";
import { GOOGLE_RATING, type Review, type ReviewSource } from "@/lib/reviews";

export type ReviewSubmission = {
  name: string;
  email: string;
  rating: number;
  text: string;
};

type SiteReviewRow = {
  id: string;
  author_name: string;
  email: string | null;
  rating: number;
  text: string;
  status: string;
  created_at: string;
};

const SITE_AVATAR_COLORS = [
  "bg-orange-500",
  "bg-tamay-primary",
  "bg-teal-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-amber-600",
  "bg-sky-600",
  "bg-emerald-600",
  "bg-indigo-500",
] as const;

function avatarColorForId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash + id.charCodeAt(i)) % SITE_AVATAR_COLORS.length;
  }
  return SITE_AVATAR_COLORS[hash] ?? "bg-tamay-primary";
}

function formatReviewDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function parseReviewDate(date: string): number {
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function mapSiteReviewToCarousel(row: SiteReviewRow): Review {
  return {
    id: row.id,
    author: row.author_name,
    date: formatReviewDate(row.created_at),
    rating: row.rating,
    text: row.text,
    avatarColor: avatarColorForId(row.id),
    source: "site",
  };
}

export function mergeCarouselReviews(staticReviews: Review[], siteReviews: Review[]): Review[] {
  const google = staticReviews.map((review) => ({
    ...review,
    source: (review.source ?? "google") as ReviewSource,
  }));

  return [...google, ...siteReviews].sort(
    (a, b) => parseReviewDate(b.date) - parseReviewDate(a.date),
  );
}

export type CombinedRating = {
  score: number;
  count: number;
  displayStars: number;
};

export function computeCombinedRating(siteReviews: { rating: number }[]): CombinedRating {
  const siteCount = siteReviews.length;
  const siteSum = siteReviews.reduce((sum, review) => sum + review.rating, 0);
  const totalCount = GOOGLE_RATING.count + siteCount;

  if (totalCount === 0) {
    return { score: 0, count: 0, displayStars: 0 };
  }

  const totalScore = GOOGLE_RATING.score * GOOGLE_RATING.count + siteSum;
  const score = Math.round((totalScore / totalCount) * 10) / 10;

  return {
    score,
    count: totalCount,
    displayStars: Math.min(5, Math.max(1, Math.round(score))),
  };
}

export async function fetchPublishedSiteReviews(): Promise<Review[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("site_reviews")
    .select("id, author_name, email, rating, text, status, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapSiteReviewToCarousel);
}

export async function submitReview(input: ReviewSubmission): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("site_reviews").insert({
    author_name: input.name.trim(),
    email: input.email.trim() || null,
    rating: input.rating,
    text: input.text.trim(),
    status: "pending",
  });

  if (error) throw error;
}
