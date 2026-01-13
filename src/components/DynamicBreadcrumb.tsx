'use client';

import React from 'react';
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FiHome } from "react-icons/fi";
import FlowerIcon from "./icons/FlowerIcon";

interface DynamicBreadcrumbProps {
  className?: string
  listClassName?: string
};

export default function DynamicBreadcrumb({ className, listClassName }: DynamicBreadcrumbProps) {
  const paths = usePathname();
  const pathNames = paths
    .split('/')
    .filter(path => path.length > 0)
    .map(path => path);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className={`font-sans ${listClassName}`}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <FiHome className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathNames.length > 0 && (
          <BreadcrumbSeparator>
            \
          </BreadcrumbSeparator>
        )}

        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathNames.length - 1;
          const formattedLink = link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, ' ');

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formattedLink}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {formattedLink}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator>
                  <FlowerIcon className='scale-125' />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}