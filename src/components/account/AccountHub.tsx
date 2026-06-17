import Link from "next/link";
import type { ReactNode } from "react";

type AccountHubCardProps = {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export function AccountHubCard({ href, title, description, icon }: AccountHubCardProps) {
  return (
    <Link
      href={href}
      className="group flex gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-tamay-primary/30 hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tamay-primary/10 text-tamay-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-tamay-primary group-hover:underline">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

type AccountPageShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function AccountPageShell({ title, description, children }: AccountPageShellProps) {
  return (
    <section className="bg-gray-50 min-h-[60vh] py-8 md:py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/m/account" className="hover:text-tamay-primary hover:underline">
            Your Account
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">{title}</span>
        </nav>

        <div className="mb-6">
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-gray-900">{title}</h1>
          {description && <p className="mt-2 text-gray-600">{description}</p>}
        </div>

        {children}
      </div>
    </section>
  );
}

export function AccountPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-5 md:p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export const accountInputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tamay-primary/30 focus:border-tamay-primary";

export const accountButtonPrimaryClass =
  "inline-flex items-center justify-center rounded-md bg-tamay-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-tamay-primary-dark transition-colors disabled:opacity-60";

export const accountButtonSecondaryClass =
  "inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors";

export function AccountEmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <AccountPanel className="text-center py-10">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </AccountPanel>
  );
}
