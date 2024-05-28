'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NAVBAR_ITEMS } from '@/constant/navbarMenu';
import { ScrollAreaDemo } from '../scrollarea/scrollarea';

function Navbar() {
  // Get the current pathname from Next.js router
  const pathname = usePathname();

  return (
    <>
      <div className="flex-1">
        {/* Navigation bar container */}
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {/* Map through NAVBAR_ITEMS to create navigation links */}
          {NAVBAR_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
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
      </div>
    </>
  );
}

export default Navbar;
