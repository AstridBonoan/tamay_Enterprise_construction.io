import { createClient } from "@/lib/supabase/client";

export type SavedAddress = {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type AddressInput = {
  label?: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  isDefault?: boolean;
};

export type SavedPaymentMethod = {
  id: string;
  user_id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
  stripe_payment_method_id: string | null;
  created_at: string;
};

export type PaymentMethodInput = {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault?: boolean;
  stripePaymentMethodId?: string;
};

export type OrderItem = {
  name: string;
  quantity: number;
  priceCents: number;
};

export type SavedOrder = {
  id: string;
  user_id: string;
  order_number: string;
  status: string;
  total_cents: number;
  currency: string;
  items: OrderItem[];
  shipping_address: SavedAddress | null;
  created_at: string;
};

export type OrderInput = {
  orderNumber: string;
  status?: string;
  totalCents: number;
  currency?: string;
  items: OrderItem[];
  shippingAddress?: AddressInput;
};

function mapAddress(row: SavedAddress): SavedAddress {
  return row;
}

function mapOrder(row: Omit<SavedOrder, "items" | "shipping_address"> & {
  items: unknown;
  shipping_address: unknown;
}): SavedOrder {
  return {
    ...row,
    items: Array.isArray(row.items) ? (row.items as OrderItem[]) : [],
    shipping_address: row.shipping_address as SavedAddress | null,
  };
}

async function clearDefaultAddresses(userId: string) {
  const supabase = createClient();
  await supabase.from("addresses").update({ is_default: false }).eq("user_id", userId);
}

async function clearDefaultPaymentMethods(userId: string) {
  const supabase = createClient();
  await supabase.from("payment_methods").update({ is_default: false }).eq("user_id", userId);
}

export async function fetchAddresses(userId: string): Promise<SavedAddress[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapAddress);
}

export async function saveAddress(userId: string, input: AddressInput, addressId?: string) {
  const supabase = createClient();
  const isDefault = input.isDefault ?? false;

  if (isDefault) {
    await clearDefaultAddresses(userId);
  }

  const payload = {
    user_id: userId,
    label: input.label?.trim() || "Home",
    full_name: input.fullName.trim(),
    line1: input.line1.trim(),
    line2: input.line2?.trim() || null,
    city: input.city.trim(),
    state: input.state.trim(),
    zip: input.zip.trim(),
    country: input.country?.trim() || "US",
    is_default: isDefault,
    updated_at: new Date().toISOString(),
  };

  if (addressId) {
    const { data, error } = await supabase
      .from("addresses")
      .update(payload)
      .eq("id", addressId)
      .eq("user_id", userId)
      .select("*")
      .single();
    if (error) throw error;
    return mapAddress(data);
  }

  const { data, error } = await supabase.from("addresses").insert(payload).select("*").single();
  if (error) throw error;
  return mapAddress(data);
}

/** Called from checkout when the customer completes billing info. */
export async function saveBillingAddress(userId: string, input: AddressInput) {
  return saveAddress(userId, { ...input, isDefault: input.isDefault ?? true });
}

export async function deleteAddress(userId: string, addressId: string) {
  const supabase = createClient();
  const { error } = await supabase.from("addresses").delete().eq("id", addressId).eq("user_id", userId);
  if (error) throw error;
}

export async function setDefaultAddress(userId: string, addressId: string) {
  await clearDefaultAddresses(userId);
  const supabase = createClient();
  const { error } = await supabase
    .from("addresses")
    .update({ is_default: true, updated_at: new Date().toISOString() })
    .eq("id", addressId)
    .eq("user_id", userId);
  if (error) throw error;
}

export async function fetchPaymentMethods(userId: string): Promise<SavedPaymentMethod[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("payment_methods")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function savePaymentMethod(userId: string, input: PaymentMethodInput) {
  const supabase = createClient();
  const isDefault = input.isDefault ?? false;

  if (isDefault) {
    await clearDefaultPaymentMethods(userId);
  }

  const { data, error } = await supabase
    .from("payment_methods")
    .insert({
      user_id: userId,
      brand: input.brand.trim(),
      last4: input.last4.trim(),
      exp_month: input.expMonth,
      exp_year: input.expYear,
      is_default: isDefault,
      stripe_payment_method_id: input.stripePaymentMethodId ?? null,
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

/** Called from checkout after a successful card charge / tokenization. */
export async function savePaymentMethodFromCheckout(userId: string, input: PaymentMethodInput) {
  return savePaymentMethod(userId, { ...input, isDefault: input.isDefault ?? true });
}

export async function deletePaymentMethod(userId: string, paymentMethodId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("payment_methods")
    .delete()
    .eq("id", paymentMethodId)
    .eq("user_id", userId);
  if (error) throw error;
}

export async function fetchOrders(userId: string): Promise<SavedOrder[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapOrder);
}

/** Called from checkout when a purchase is completed. */
export async function recordOrder(userId: string, input: OrderInput) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      order_number: input.orderNumber,
      status: input.status ?? "processing",
      total_cents: input.totalCents,
      currency: input.currency ?? "USD",
      items: input.items,
      shipping_address: input.shippingAddress ?? null,
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapOrder(data);
}

export function formatAddressLines(address: Pick<SavedAddress, "line1" | "line2" | "city" | "state" | "zip">) {
  const line2 = address.line2 ? `${address.line2}, ` : "";
  return `${address.line1}, ${line2}${address.city}, ${address.state} ${address.zip}`;
}

export function formatMoney(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(cents / 100);
}

export function formatOrderDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(iso));
}

export function paymentBrandLabel(brand: string) {
  const normalized = brand.toLowerCase();
  if (normalized === "visa") return "Visa";
  if (normalized === "mastercard") return "Mastercard";
  if (normalized === "amex") return "American Express";
  if (normalized === "discover") return "Discover";
  return brand;
}
