'use client';

import React from 'react';
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FlowerIcon from "./icons/FlowerIcon";
import { FiHome } from "react-icons/fi";
import { Step } from '@/data/types/customization.type';
import { useTheme } from 'next-themes';

interface WizardStepsBreadcrumbProps {
  steps: Step[];
  currentStep: Step;
  onStepClick?: (step: Step) => void;
};

export default function WizardStepsBreadcrumb({
  steps,
  currentStep,
  onStepClick
}: WizardStepsBreadcrumbProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStep.id);
  const { theme } = useTheme();

  return (
    <Breadcrumb>
      <BreadcrumbList className="font-sans flex-wrap text-xs">
        <BreadcrumbItem>
          <BreadcrumbLink
            aria-label="Voltar para a página inicial"
            title="Voltar para a página inicial"
            href={'/'}
            className="flex items-center dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-200 transition-colors"
          >
            <FiHome className="h-3.5 w-3.5" />
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          /
        </BreadcrumbSeparator>

        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isCurrent = index === currentIndex;
          const isPast = index < currentIndex;
          const isFuture = index > currentIndex;

          return (
            <React.Fragment key={step.id}>
              <BreadcrumbItem>
                {isCurrent && (
                  <BreadcrumbPage className="font-bold text-foreground flex items-center gap-1">
                    {step.title}
                  </BreadcrumbPage>
                )}

                {isPast && (
                  <BreadcrumbLink
                    href={''}
                    title={step.title}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onStepClick) {
                        onStepClick(step);
                      } else if (step.href) {
                        window.location.href = step.href;
                      };
                    }}
                    className={`flex items-center gap-1 transition-colors 
                      text-muted-foreground dark:text-zinc-500 hover:text-primary dark:hover:text-zinc-400 italic
                    `}
                  >
                    {step.title}
                  </BreadcrumbLink>
                )}

                {isFuture && (
                  <span className="text-muted-foreground/50 dark:text-zinc-500/50 cursor-default select-none flex items-center gap-1">
                    {step.title}
                  </span>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator className={cn(isFuture ? "opacity-50" : "opacity-100")}>
                  <FlowerIcon 
                    color={ theme === 'dark' ? "var(--color-zinc-500)" : "var(--color-secondary)" }
                    className="scale-125" 
                  />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};