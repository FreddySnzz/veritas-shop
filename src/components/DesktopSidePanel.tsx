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
      className={`flex shrink-0 flex-col lg:max-w-80 xl:max-w-100 ${className}`}
    >
      <div className={`sticky top-0 flex flex-col gap-4`}>
        <div className={`bg-white dark:bg-input/0 lg:dark:bg-input/50 rounded-xl ${contentClassName}`}>
          {title && (
            <h2 className="text-sm font-bold text-secondary dark:text-zinc-50 mb-3">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </aside>
  );
};