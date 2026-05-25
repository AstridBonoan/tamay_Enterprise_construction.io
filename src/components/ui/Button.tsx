import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "accent" | "outline";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: ButtonProps) {
  const base =
    "inline-block font-bold text-sm tracking-wide px-6 py-3 transition-colors text-center";
  const variants = {
    primary: "bg-tamay-primary hover:bg-tamay-primary-dark text-white",
    accent: "bg-tamay-accent hover:bg-tamay-accent-hover text-white",
    outline: "border-2 border-tamay-primary text-tamay-primary hover:bg-tamay-primary hover:text-white",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
