"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAVBAR_ITEMS } from "@/constant/navbarMenu";
function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {NAVBAR_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === item.path
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              } transition-all hover:text-primary`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
