'use client';
import Link from 'next/link';
import { TriangleAlert } from 'lucide-react';
import { ScrollAreaDemo } from '../scrollarea/scrollarea';
import { SheetContent } from '@/components/ui/sheet';
import { NAVBAR_ITEMS } from '@/constant/navbarMenu';
import { usePathname } from 'next/navigation';

export function NavbarSheet() {
  // Get the current pathname from Next.js router
  const pathname = usePathname();

  return (
    <>
      {/* SheetContent component to render the navigation content */}
      <SheetContent side="left" className="flex flex-col">
        {/* Navigation container */}
        <nav className="grid gap-2 text-lg font-medium">
          {/* Link for the top section with an icon */}
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <TriangleAlert className="h-6 w-6" />
          </Link>

          {/* Map through NAVBAR_ITEMS to create navigation links */}
          {NAVBAR_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                pathname === item.path
                  ? 'bg-muted text-foreground' // Apply active styles if current path matches item path
                  : 'text-muted-foreground hover:text-foreground' // Apply default styles otherwise
              } transition-all hover:text-primary`}
            >
              {/* Render the icon and title for each navigation item */}
              {item.icon}
              {item.title}
            </Link>
          ))}

          {/* Include ScrollAreaDemo component */}
          <ScrollAreaDemo />
        </nav>
      </SheetContent>
    </>
  );
}
