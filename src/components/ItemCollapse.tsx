"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface ItemCollapseProps {
  title: string;
  children: React.ReactNode;
  collapseClassName?: string;
  insideClassName?: string;
  titleClassName?: string;
};

export default function ItemCollapse({ 
  title, 
  children,
  collapseClassName,
  insideClassName,
  titleClassName,
}: ItemCollapseProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className="w-full">
      <button
        onClick={toggleExpanded}
        className={`flex w-full items-center justify-between cursor-pointer focus:outline-none ${collapseClassName}`}
        aria-expanded={expanded}
      >
        <span className={cn(`font-bold text-secondary dark:text-zinc-200 ${titleClassName}`)}>
          {title}
        </span>
        <motion.div
          animate={{ rotate: expanded ? 0 : -90 }}
          transition={{ duration: 0.3 }}
        >
          <FaAngleDown className="text-secondary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={insideClassName}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};