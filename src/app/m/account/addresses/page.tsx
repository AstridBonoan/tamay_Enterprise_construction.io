"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AccountEmptyState,
  AccountPageShell,
  AccountPanel,
  accountButtonSecondaryClass,
  accountInputClass,
} from "@/components/account/AccountHub";
import { useRequireAuth } from "@/components/auth/useRequireAuth";
import {
  deleteAddress,
  fetchAddresses,
  formatAddressLines,
  saveAddress,
  setDefaultAddress,
  type SavedAddress,
} from "@/lib/account-data";

export default function AddressesPage() {
  const { user, loading } = useRequireAuth("/m/account/addresses");
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    label: "Home",
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadAddresses = useCallback(async () => {
    if (!user) return;
    setLoadingAddresses(true);
    try {
      setAddresses(await fetchAddresses(user.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load addresses.");
    } finally {
      setLoadingAddresses(false);
    }
  }, [user]);

  useEffect(() => {
    void loadAddresses();
  }, [loadAddresses]);

  const cancelEdit = () => {
    setEditingId(null);
    setError(null);
  };

  const startEdit = (address: SavedAddress) => {
    setEditingId(address.id);
    setForm({
      label: address.label,
      fullName: address.full_name,
      line1: address.line1,
      line2: address.line2 ?? "",
      city: address.city,
      state: address.state,
      zip: address.zip,
      isDefault: address.is_default,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !editingId) return;

    setSaving(true);
    setError(null);

    try {
      await saveAddress(
        user.id,
        {
          label: form.label,
          fullName: form.fullName,
          line1: form.line1,
          line2: form.line2 || undefined,
          city: form.city,
          state: form.state,
          zip: form.zip,
          isDefault: form.isDefault,
        },
        editingId,
      );
      await loadAddresses();
      cancelEdit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save address.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (addressId: string) => {
    if (!user || !confirm("Remove this address?")) return;
    try {
      await deleteAddress(user.id, addressId);
      await loadAddresses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove address.");
    }
  };

  const onSetDefault = async (addressId: string) => {
    if (!user) return;
    try {
      await setDefaultAddress(user.id, addressId);
      await loadAddresses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update default address.");
    }
  };

  if (loading || !user) return null;

  return (
    <AccountPageShell
      title="Your Addresses"
      description="Addresses are saved when you submit a job application or complete checkout billing."
    >
      <div className="space-y-4">
        {editingId && (
          <AccountPanel>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit address</h2>
            <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
              <div>
                <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">
                  Address label
                </label>
                <input
                  id="label"
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className={accountInputClass}
                />
              </div>
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name
                </label>
                <input
                  id="full-name"
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={accountInputClass}
                />
              </div>
              <div>
                <label htmlFor="line1" className="block text-sm font-medium text-gray-700 mb-1">
                  Street address
                </label>
                <input
                  id="line1"
                  type="text"
                  required
                  value={form.line1}
                  onChange={(e) => setForm({ ...form, line1: e.target.value })}
                  className={accountInputClass}
                />
              </div>
              <div>
                <label htmlFor="line2" className="block text-sm font-medium text-gray-700 mb-1">
                  Apt, suite, etc. (optional)
                </label>
                <input
                  id="line2"
                  type="text"
                  value={form.line2}
                  onChange={(e) => setForm({ ...form, line2: e.target.value })}
                  className={accountInputClass}
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={accountInputClass}
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className={accountInputClass}
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP code
                  </label>
                  <input
                    id="zip"
                    type="text"
                    required
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className={accountInputClass}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="rounded border-gray-300 text-tamay-primary focus:ring-tamay-primary"
                />
                Set as default address
              </label>

              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <button type="submit" disabled={saving} className={accountButtonSecondaryClass}>
                  {saving ? "Saving..." : "Save changes"}
                </button>
                <button type="button" onClick={cancelEdit} className={accountButtonSecondaryClass}>
                  Cancel
                </button>
              </div>
            </form>
          </AccountPanel>
        )}

        {loadingAddresses ? (
          <AccountPanel>
            <p className="text-sm text-gray-600">Loading addresses...</p>
          </AccountPanel>
        ) : addresses.length === 0 ? (
          <AccountEmptyState
            title="No addresses saved yet"
            description="Submit a job application or complete a purchase to save your address here."
            action={
              <Link href="/careers-partnerships/apply" className={accountButtonSecondaryClass}>
                Go to job application
              </Link>
            }
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <AccountPanel key={address.id}>
                <div>
                  <p className="font-semibold text-gray-900">
                    {address.label}
                    {address.is_default && (
                      <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-tamay-primary">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">{address.full_name}</p>
                  <p className="text-sm text-gray-600">{formatAddressLines(address)}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => startEdit(address)}
                    className="font-semibold text-tamay-primary hover:underline"
                  >
                    Edit
                  </button>
                  {!address.is_default && (
                    <button
                      type="button"
                      onClick={() => void onSetDefault(address.id)}
                      className="font-semibold text-tamay-primary hover:underline"
                    >
                      Set as default
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => void onDelete(address.id)}
                    className="font-semibold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </AccountPanel>
            ))}
          </div>
        )}

        <Link href="/m/account" className={`${accountButtonSecondaryClass} mt-2`}>
          Back to Your Account
        </Link>
      </div>
    </AccountPageShell>
  );
}
