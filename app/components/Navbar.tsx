"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Show or hide the navbar based on the scroll direction.
  useEffect(() => {
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
  }, []);

  return (
    <div className={isVisible ? "navbar" : "navbar hidden"}>
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