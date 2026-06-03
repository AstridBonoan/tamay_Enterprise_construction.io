type CollapsedFloatButtonProps = {
  label: string;
  stackIndex: number;
  onClick: () => void;
  ariaLabel: string;
};

export function CollapsedFloatButton({ label, stackIndex, onClick, ariaLabel }: CollapsedFloatButtonProps) {
  const bottomOffset = `calc(${0.75 + stackIndex * 2.85}rem + env(safe-area-inset-bottom, 0px))`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="fixed right-3 z-[75] flex h-10 items-center justify-center rounded-full bg-tamay-primary text-white text-xs font-bold tracking-wide shadow-lg border border-tamay-accent px-3.5 hover:bg-tamay-primary-dark transition-colors"
      style={{ bottom: bottomOffset }}
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
