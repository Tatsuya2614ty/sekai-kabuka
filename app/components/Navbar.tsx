"use client";

type NavbarProps = { bottom?: boolean; };

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ bottom = false }: NavbarProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Show or hide the navbar based on the scroll direction.
  useEffect(() => {
    if (bottom) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // wait until the user scrolls down 60px before hiding the navbar.
      const shouldHide = currentScrollY > 60;

      if (shouldHide && currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [bottom]);

  const navbarClassName = bottom
    ? "navbar navbar-bottom"
    : isVisible
      ? "navbar"
      : "navbar hidden";

  return (
    <div className={navbarClassName}>
      <Link href="/">
        <button className={pathname === "/" ? "active" : ""}>
          US Stocks
        </button>
      </Link>

      <Link href="/global">
        <button className={pathname === "/global" ? "active" : ""}>
          Global Markets
        </button>
      </Link>

      <Link href="/forex">
        <button className={pathname === "/forex" ? "active" : ""}>
          Forex
        </button>
      </Link>

      <Link href="/crypto">
        <button className={pathname === "/crypto" ? "active" : ""}>
          Crypto
        </button>
      </Link>

      <Link href="/commodities">
        <button className={pathname === "/commodities" ? "active" : ""}>
          Commodities
        </button>
      </Link>
    </div>
  );
}