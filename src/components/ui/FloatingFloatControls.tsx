import { FLOAT_ROW_BOTTOM_CLASS } from "@/lib/floatDock";

type CollapsedFloatButtonProps = {
  label: string;
  side: "left" | "right";
  onClick: () => void;
  ariaLabel: string;
};

export function CollapsedFloatButton({ label, side, onClick, ariaLabel }: CollapsedFloatButtonProps) {
  const horizontal = side === "left" ? "left-3 sm:left-4" : "right-3 sm:right-5";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`fixed ${horizontal} ${FLOAT_ROW_BOTTOM_CLASS} z-[75] flex min-h-11 items-center justify-center rounded-full bg-tamay-primary text-white text-xs font-bold tracking-wide shadow-lg border border-tamay-accent px-3.5 hover:bg-tamay-primary-dark transition-colors`}
    >
      {label}
    </button>
  );
}

export function FloatCloseButton({ onClick, ariaLabel }: { onClick: () => void; ariaLabel: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="absolute top-1.5 right-1.5 z-10 flex h-9 w-9 min-h-9 min-w-9 items-center justify-center rounded-full bg-white/95 text-gray-700 text-lg leading-none shadow hover:bg-white transition-colors"
    >
      ×
    </button>
  );
}
