import { collapsedFloatBottom } from "@/lib/floatDock";

type CollapsedFloatButtonProps = {
  label: string;
  stackIndex: number;
  aboveChat?: boolean;
  onClick: () => void;
  ariaLabel: string;
};

export function CollapsedFloatButton({
  label,
  stackIndex,
  aboveChat = false,
  onClick,
  ariaLabel,
}: CollapsedFloatButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="fixed left-3 sm:left-4 z-[75] flex h-10 items-center justify-center rounded-full bg-tamay-primary text-white text-xs font-bold tracking-wide shadow-lg border border-tamay-accent px-3.5 hover:bg-tamay-primary-dark transition-colors"
      style={{ bottom: collapsedFloatBottom(stackIndex, aboveChat) }}
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
      className="absolute top-1.5 right-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-gray-700 text-lg leading-none shadow hover:bg-white transition-colors"
    >
      ×
    </button>
  );
}
