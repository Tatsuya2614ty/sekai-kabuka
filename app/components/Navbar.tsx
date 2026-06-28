"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="navbar">
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