"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";

const links = [
  { label: "Home", href: "/home" },
  { label: "About Me", href: "/about-me" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-canvas pt-3">
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between h-14">

        {/* Brand — floating card */}
        <Link
          href="/home"
          className="text-ink text-sm font-semibold tracking-tight hover:text-ink-strong transition-colors
            px-3 py-1.5 border border-hairline bg-canvas-soft
            shadow-[0_0_15px_rgba(92,88,85,0.2)]"
        >
          iamszho
        </Link>

        {/* Master rectangle wrapping all nav links */}
        <ul className="hidden md:flex items-center gap-2 border border-hairline bg-canvas-soft px-2 py-2">
          {links.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    block px-3 py-1.5 text-sm leading-5 font-medium
                    border transition-colors duration-150
                    ${active
                      ? "bg-primary border-primary text-canvas"
                      : "bg-transparent border-hairline text-body hover:bg-primary hover:border-primary hover:text-canvas"
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA — floating glow */}
        <div className="hidden md:block shadow-[0_0_15px_rgba(0,217,146,0.2)]">
          <Button variant="primary" className="text-sm py-2 px-4">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 text-ink"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-px bg-current transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-hairline bg-canvas flex flex-col px-8 py-4 gap-4">
          {links.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`
                  block px-3 py-2 text-sm leading-5 font-medium
                  border transition-colors duration-150
                  ${active
                    ? "bg-primary border-primary text-canvas"
                    : "bg-transparent border-hairline text-body hover:bg-primary hover:border-primary hover:text-canvas"
                  }
                `}
              >
                {label}
              </Link>
            );
          })}

          {/* Mobile CTA pinned at bottom */}
          <div className="mt-2">
            <Button variant="primary" className="w-full justify-center">
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
