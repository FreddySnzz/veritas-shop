'use client';

import { ReactNode } from 'react';

interface DesktopSidePanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function DesktopSidePanel({
  title,
  children,
  className = '',
  contentClassName = '',
}: DesktopSidePanelProps) {
  return (
    <aside
      aria-label='Painel lateral'
      className={`flex shrink-0 flex-col lg:max-w-60 xl:max-w-full ${className}`}
    >
      <div className={`sticky top-0 flex flex-col gap-4`}>
        <div className={`bg-white rounded-xl shadow-xs ${contentClassName}`}>
          {title && (
            <h2 className="text-sm font-bold text-secondary mb-3">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </aside>
  );
};