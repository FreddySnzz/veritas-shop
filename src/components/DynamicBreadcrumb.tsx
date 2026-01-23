'use client';

import React, { useMemo } from 'react';
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
import { verifyFirebaseId } from '@/data/functions/verifyFirebaseId';

interface DynamicBreadcrumbProps {
  className?: string
  listClassName?: string
};

export default function DynamicBreadcrumb({ className, listClassName }: DynamicBreadcrumbProps) {
  const paths = usePathname();

  const breadcrumbList = useMemo(() => {
    const segments = paths.split('/').filter(path => path.length > 0);
    const lastSegment = segments[segments.length - 1];

    if (lastSegment && verifyFirebaseId(lastSegment)) {
      segments.pop(); 
    };

    return segments;
  }, [paths]);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className={`font-sans ${listClassName}`}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin" className="flex items-center">
            <FiHome className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbList.length > 0 && breadcrumbList.length <= 4 && (
          <BreadcrumbSeparator>
            /
          </BreadcrumbSeparator>
        )}

        { breadcrumbList.map((link, index) => {
          const href = `/${breadcrumbList.slice(0, index + 1).join('/')}`;
          
          const isLast = index === breadcrumbList.length - 1;
          let formattedLink = link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, ' ');
          formattedLink.includes('Itens personalizacao') ? formattedLink = 'Itens' : formattedLink;
          formattedLink.includes('Cordoes') ? formattedLink = 'Cordões' : formattedLink;
          formattedLink.includes('Catalogo') ? formattedLink = 'Produtos' : formattedLink;
          formattedLink.includes('Admin') && breadcrumbList.length > 4 ? formattedLink = '' : formattedLink;

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
};