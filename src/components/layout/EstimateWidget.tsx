"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";

export function EstimateWidget() {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-tamay-accent text-white px-4 py-2 rounded shadow-lg text-sm font-bold hover:bg-tamay-accent-hover"
      >
        ESTIMATE MY PROJECT
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-sm z-40 bg-white border border-gray-200 shadow-2xl rounded-t-lg sm:rounded-lg overflow-hidden max-sm:mb-0">
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl leading-none z-10"
        aria-label="Close"
      >
        ×
      </button>
      <div className="relative h-28 bg-gray-100">
        <Image
          src={IMAGES.estimatePopup}
          alt=""
          fill
          className="object-cover object-top"
          sizes="400px"
          unoptimized
        />
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-tamay-primary mb-2">
          Need Help with a small home project?
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          TV mounting, faucet replacements, vanity installs, painting, drywall patches, lighting, and more — get a quick estimate for your project today.
        </p>
        <Link
          href={SITE.estimateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-tamay-accent hover:bg-tamay-accent-hover text-white font-bold py-2.5 px-4 text-sm tracking-wide transition-colors"
        >
          ESTIMATE MY PROJECT
        </Link>
      </div>
    </div>
  );
}
