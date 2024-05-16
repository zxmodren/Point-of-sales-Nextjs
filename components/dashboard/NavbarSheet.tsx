"use client";
import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { SheetContent } from "@/components/ui/sheet";
import { NAVBAR_ITEMS } from "@/constant/navbarMenu";
import { usePathname } from "next/navigation";

export function NavbarSheet() {
  const pathname = usePathname();
  return (
    <>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {NAVBAR_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
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
      </SheetContent>
    </>
  );
}
