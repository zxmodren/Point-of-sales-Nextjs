"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Bread() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const currentPath = `/${pathSegments.slice(0, index + 1).join("/")}/`;
    const isLast = index === pathSegments.length - 1;

    return (
      <React.Fragment key={currentPath}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={currentPath}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });
  return (
    <div className="w-full flex-1">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default Bread;
