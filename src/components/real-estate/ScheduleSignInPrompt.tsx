import Link from "next/link";
import { sitePath } from "@/lib/paths";

type ScheduleSignInPromptProps = {
  schedulePath: string;
  actionLabel: string;
};

export function ScheduleSignInPrompt({ schedulePath, actionLabel }: ScheduleSignInPromptProps) {
  const loginHref = sitePath(`/m/login?r=${encodeURIComponent(schedulePath)}`);

  return (
    <div className="rounded-sm border border-tamay-primary/20 bg-tamay-primary/5 px-5 py-6 text-center">
      <p className="font-heading text-lg font-semibold text-tamay-primary">Sign in to {actionLabel.toLowerCase()}</p>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        Create a free account or sign in so your viewing is saved to your Bookings dashboard.
      </p>
      <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={loginHref}
          className="inline-block font-bold text-sm tracking-wide px-6 py-3 bg-tamay-primary hover:bg-tamay-primary-dark text-white transition-colors"
        >
          Sign in
        </Link>
        <Link
          href={sitePath(`/m/create-account?r=${encodeURIComponent(schedulePath)}`)}
          className="inline-block font-bold text-sm tracking-wide px-6 py-3 border-2 border-tamay-primary text-tamay-primary hover:bg-tamay-primary hover:text-white transition-colors"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}
