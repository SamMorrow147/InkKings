"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "./HamburgerMenu.css";

const ARTISTS = [
  { href: "/portfolio/steve", label: "Steve" },
  { href: "/portfolio/hunter", label: "Hunter" },
  { href: "/portfolio/austin", label: "Austin" },
  { href: "/portfolio/nick", label: "Nick" },
  { href: "/portfolio/john", label: "John" },
  { href: "/portfolio/breaelle", label: "Breaelle" },
];

export default function HamburgerMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggled, setToggled] = useState(false);
  const [artistsOpen, setArtistsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setToggled(false);
    setArtistsOpen(false);
  }, [pathname]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setToggled((prev) => {
      if (prev) setArtistsOpen(false);
      return !prev;
    });
  };

  const closeMenu = () => setToggled(false);
  const isPortfolio = pathname?.startsWith("/portfolio") ?? false;

  return (
    <div className="hamburger-screen">
      <header className={`hamburger-header ${isPortfolio ? "hamburger-header--portfolio" : ""}`}>
        <button
          type="button"
          className={`target-burger ${toggled ? "toggled" : ""}`}
          onClick={handleToggle}
          aria-expanded={toggled}
          aria-controls="main-nav"
          aria-label={toggled ? "Close menu" : "Open menu"}
        >
          <span className="buns" aria-hidden="true">
            <span className="bun" />
            <span className="bun" />
          </span>
        </button>
      </header>

      <nav
        id="main-nav"
        className={`main-nav ${toggled ? "toggled" : ""}`}
        role="navigation"
        aria-hidden={!toggled}
      >
        <div className="main-nav-inner">
          <ul>
            {/* Home */}
            <li>
              <a href="/" onClick={closeMenu}>Home</a>
            </li>

            {/* Policies */}
            <li>
              <a href="/policies" onClick={closeMenu}>Policies</a>
            </li>

            {/* Artists – expandable */}
            <li className="nav-has-children">
              <button
                type="button"
                className={`nav-parent-btn ${artistsOpen ? "open" : ""}`}
                onClick={() => setArtistsOpen((prev) => !prev)}
                aria-expanded={artistsOpen}
              >
                Artists
                <span className="nav-chevron" aria-hidden="true" />
              </button>

              <div className={`nav-drawer ${artistsOpen ? "open" : ""}`} aria-hidden={!artistsOpen}>
                <ul className="nav-drawer-list">
                  {ARTISTS.map(({ href, label }) => (
                    <li key={href}>
                      <a href={href} onClick={closeMenu}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Location */}
            <li>
              <a href="/location" onClick={closeMenu}>Location</a>
            </li>

            {/* Events */}
            <li>
              <a href="/events" onClick={closeMenu}>Events</a>
            </li>

            {/* Aftercare */}
            <li>
              <a href="/aftercare" onClick={closeMenu}>Aftercare</a>
            </li>

            {/* Contact */}
            <li>
              <a href="/request" onClick={closeMenu}>Contact</a>
            </li>
          </ul>

          <div className="nav-social" aria-label="Social links">
            <a
              href="https://www.facebook.com/InkKingsTattoo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ink Kings Tattoo on Facebook"
            >
              <img src="/facebook.svg" alt="" width={28} height={28} />
            </a>
            <a
              href="https://www.instagram.com/inkkingstattoo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ink Kings Tattoo on Instagram"
            >
              <img src="/instagram.svg" alt="" width={28} height={28} />
            </a>
          </div>
        </div>
      </nav>

      <div className="hamburger-container">
        {children}
      </div>
    </div>
  );
}
