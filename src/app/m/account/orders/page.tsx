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
  fetchOrders,
  formatMoney,
  formatOrderDate,
  type SavedOrder,
} from "@/lib/account-data";
import { SITE } from "@/lib/site";

function orderStatusLabel(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "delivered") return "Delivered";
  if (normalized === "shipped") return "Shipped";
  if (normalized === "processing") return "Processing";
  if (normalized === "cancelled") return "Cancelled";
  return status;
}

export default function OrdersPage() {
  const { user, loading } = useRequireAuth("/m/account/orders");
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    if (!user) return;
    setLoadingOrders(true);
    try {
      setOrders(await fetchOrders(user.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load orders.");
    } finally {
      setLoadingOrders(false);
    }
  }, [user]);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  if (loading || !user) return null;

  return (
    <AccountPageShell
      title="Your Orders"
      description="View your purchase history and order details from cart checkout."
    >
      <div className="space-y-4">
        {error && (
          <AccountPanel>
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          </AccountPanel>
        )}

        {loadingOrders ? (
          <AccountPanel>
            <p className="text-sm text-gray-600">Loading orders...</p>
          </AccountPanel>
        ) : orders.length === 0 ? (
          <AccountEmptyState
            title="No orders yet"
            description="When you complete a purchase from your cart, your order history will show up here."
            action={
              <Link href={SITE.headerCartUrl} className={accountButtonSecondaryClass}>
                Browse services
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <AccountPanel key={order.id}>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order placed</p>
                    <p className="font-semibold text-gray-900">{formatOrderDate(order.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-semibold text-gray-900">
                      {formatMoney(order.total_cents, order.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order #</p>
                    <p className="font-semibold text-gray-900">{order.order_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold text-tamay-primary">{orderStatusLabel(order.status)}</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {order.items.map((item, index) => (
                    <li key={`${order.id}-${index}`} className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-800">
                        {item.name}
                        {item.quantity > 1 ? ` × ${item.quantity}` : ""}
                      </span>
                      <span className="text-gray-600 shrink-0">
                        {formatMoney(item.priceCents * item.quantity, order.currency)}
                      </span>
                    </li>
                  ))}
                </ul>
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
