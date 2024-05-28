'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

function Bread() {
  // Get the current pathname from Next.js router
  const pathname = usePathname();

  // Split the pathname into segments, filtering out any empty segments
  const pathSegments = pathname.split('/').filter((segment) => segment !== '');

  // Map each segment to a breadcrumb item
  const breadcrumbItems = pathSegments.map((segment, index) => {
    // Create the current path up to this segment
    const currentPath = `/${pathSegments.slice(0, index + 1).join('/')}/`;
    // Determine if this is the last segment
    const isLast = index === pathSegments.length - 1;

    return (
      // Use React.Fragment with a unique key for each breadcrumb item
      <React.Fragment key={currentPath}>
        <BreadcrumbItem>
          {isLast ? (
            // If this is the last segment, render it as a breadcrumb page
            <BreadcrumbPage>
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </BreadcrumbPage>
          ) : (
            // Otherwise, render it as a breadcrumb link
            <BreadcrumbLink asChild>
              <Link href={currentPath}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}{' '}
        {/* Render a separator if this is not the last segment */}
      </React.Fragment>
    );
  });

  return (
    <div className="w-full flex-1">
      {/* Render the breadcrumb navigation */}
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default Bread;
