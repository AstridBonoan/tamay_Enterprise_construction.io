import { FinancingPromoCard } from "@/components/finance/FinancingPromoCard";

export function FinancingBanner() {
  return (
    <section className="bg-gray-50 px-4 pt-10 sm:pt-12 pb-8 sm:pb-10">
      <div className="max-w-5xl mx-auto">
        <FinancingPromoCard />
      </div>
    </section>
  );
}
