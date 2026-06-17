"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  AccountEmptyState,
  AccountPageShell,
  AccountPanel,
  accountButtonSecondaryClass,
} from "@/components/account/AccountHub";
import { useRequireAuth } from "@/components/auth/useRequireAuth";
import {
  deletePaymentMethod,
  fetchPaymentMethods,
  paymentBrandLabel,
  type SavedPaymentMethod,
} from "@/lib/account-data";
import { SITE } from "@/lib/site";

export default function PaymentsPage() {
  const { user, loading } = useRequireAuth("/m/account/payments");
  const [methods, setMethods] = useState<SavedPaymentMethod[]>([]);
  const [loadingMethods, setLoadingMethods] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMethods = useCallback(async () => {
    if (!user) return;
    setLoadingMethods(true);
    try {
      setMethods(await fetchPaymentMethods(user.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load payment methods.");
    } finally {
      setLoadingMethods(false);
    }
  }, [user]);

  useEffect(() => {
    void loadMethods();
  }, [loadMethods]);

  const onRemove = async (paymentMethodId: string) => {
    if (!user || !confirm("Remove this payment method?")) return;
    try {
      await deletePaymentMethod(user.id, paymentMethodId);
      await loadMethods();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove payment method.");
    }
  };

  if (loading || !user) return null;

  return (
    <AccountPageShell
      title="Your Payments"
      description="Cards used at checkout are saved here for faster purchases. We only store the card brand and last four digits."
    >
      <div className="space-y-4">
        {error && (
          <AccountPanel>
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          </AccountPanel>
        )}

        {loadingMethods ? (
          <AccountPanel>
            <p className="text-sm text-gray-600">Loading payment methods...</p>
          </AccountPanel>
        ) : methods.length === 0 ? (
          <AccountEmptyState
            title="No payment methods saved"
            description="When you check out from your cart, your card details will be saved here for future purchases."
            action={
              <Link href={SITE.headerCartUrl} className={accountButtonSecondaryClass}>
                Browse services
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {methods.map((method) => (
              <AccountPanel key={method.id}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {paymentBrandLabel(method.brand)} ending in {method.last4}
                      {method.is_default && (
                        <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-tamay-primary">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">
                      Expires {String(method.exp_month).padStart(2, "0")}/{method.exp_year}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void onRemove(method.id)}
                    className="text-sm font-semibold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </AccountPanel>
            ))}
          </div>
        )}

        <Link href="/m/account" className={accountButtonSecondaryClass}>
          Back to Your Account
        </Link>
      </div>
    </AccountPageShell>
  );
}
