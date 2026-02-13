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

  return (
    <Breadcrumb>
      <BreadcrumbList className="font-sans flex-wrap text-xs">
        <BreadcrumbItem>
          <BreadcrumbLink
            aria-label="Voltar para a página inicial"
            title="Voltar para a página inicial"
            href={'/'}
            className="flex items-center hover:text-primary transition-colors"
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
                      text-muted-foreground hover:text-primary italic
                    `}
                  >
                    {step.title}
                  </BreadcrumbLink>
                )}

                {isFuture && (
                  <span className="text-muted-foreground/50 cursor-default select-none flex items-center gap-1">
                    {step.title}
                  </span>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator className={cn(isFuture ? "opacity-50" : "opacity-100")}>
                  <FlowerIcon className="scale-125" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};