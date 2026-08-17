"use client";

import { useEffect, useId, useState } from "react";
import { sitePath } from "@/lib/paths";

const SUBCONTRACTOR_APPLY_PATH = "/careers-partnerships/subcontractor-apply";
const DEFAULT_EMPLOYEE_APPLY_PATH = "/careers-partnerships/apply";

const choiceButtonClass =
  "block w-full text-center font-bold text-sm tracking-wide px-6 py-3 transition-colors";

type JoinTeamChoiceDialogProps = {
  open: boolean;
  onClose: () => void;
  employeeHref?: string;
};

export function JoinTeamChoiceDialog({
  open,
  onClose,
  employeeHref = DEFAULT_EMPLOYEE_APPLY_PATH,
}: JoinTeamChoiceDialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-black/55"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md bg-white shadow-xl border border-gray-200 p-6 md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="font-heading text-xl text-tamay-primary font-semibold">
          How would you like to join?
        </h2>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Choose the application that matches how you want to work with Tamay Enterprises.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={sitePath(employeeHref)}
            className={`${choiceButtonClass} bg-tamay-accent hover:bg-tamay-accent-hover text-white`}
            onClick={onClose}
          >
            Employee
          </a>
          <a
            href={sitePath(SUBCONTRACTOR_APPLY_PATH)}
            className={`${choiceButtonClass} bg-tamay-primary hover:bg-tamay-primary-dark text-white`}
            onClick={onClose}
          >
            Subcontractor
          </a>
        </div>

        <button
          type="button"
          className="mt-4 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

type JoinTeamButtonProps = {
  employeeHref?: string;
  variant?: "primary" | "accent" | "outline";
  className?: string;
  children: React.ReactNode;
};

export function JoinTeamButton({
  employeeHref = DEFAULT_EMPLOYEE_APPLY_PATH,
  variant = "primary",
  className = "",
  children,
}: JoinTeamButtonProps) {
  const [open, setOpen] = useState(false);

  const base =
    "inline-block font-bold text-sm tracking-wide px-6 py-3 transition-colors text-center cursor-pointer";
  const variants = {
    primary: "bg-tamay-primary hover:bg-tamay-primary-dark text-white",
    accent: "bg-tamay-accent hover:bg-tamay-accent-hover text-white",
    outline: "border-2 border-tamay-primary text-tamay-primary hover:bg-tamay-primary hover:text-white",
  };

  return (
    <>
      <button
        type="button"
        className={`${base} ${variants[variant]} ${className}`}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      <JoinTeamChoiceDialog
        open={open}
        onClose={() => setOpen(false)}
        employeeHref={employeeHref}
      />
    </>
  );
}
