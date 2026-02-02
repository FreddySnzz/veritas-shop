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
import ProductModel from '@/data/models/Product.model';

interface DynamicBreadcrumbProps {
  className?: string
  listClassName?: string
  mode?: 'user' | 'admin'
  product?: ProductModel
};

export default function DynamicBreadcrumb({ 
  className, 
  listClassName, 
  mode, 
  product 
}: DynamicBreadcrumbProps) {
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
          <BreadcrumbLink 
            aria-label="Voltar para a página inicial"
            title="Voltar para a página inicial"
            href={ mode === 'admin' ? '/admin' : '/'} 
            className="flex items-center"
          >
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
          
          if (formattedLink.includes('Itens personalizacao')) {
            formattedLink = 'Itens';
          } else if (formattedLink.includes('Catalogo')) {
            formattedLink = 'Produtos';
          } else if (formattedLink.includes('Admin') && breadcrumbList.length > 4) {
            formattedLink = '';
          };

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{product ? product.name : formattedLink}</BreadcrumbPage>
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