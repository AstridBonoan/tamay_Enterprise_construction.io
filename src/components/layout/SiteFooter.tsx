import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/lib/site";

const socialIcons = [
  { href: SITE.social.facebook, label: "Facebook" },
  { href: SITE.social.instagram, label: "Instagram" },
  { href: SITE.social.tiktok, label: "TikTok" },
  { href: SITE.social.youtube, label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <ul className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-tamay-primary mb-6">
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-600 mb-4">
          Copyright © {new Date().getFullYear()} {SITE.legalName} - All Rights Reserved.
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {socialIcons.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-tamay-primary text-white flex items-center justify-center text-xs font-bold hover:bg-tamay-primary-dark transition-colors"
              aria-label={s.label}
            >
              {s.label[0]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
