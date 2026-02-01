"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";

interface ItemCollapseProps {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function ItemCollapse({ 
  title, 
  children,
  className,
}: ItemCollapseProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className="w-full">
      <button
        onClick={toggleExpanded}
        className="flex w-full items-center justify-between cursor-pointer focus:outline-none"
        aria-expanded={expanded}
      >
        <span className="font-bold text-gray-400">
          {title}
        </span>
        <motion.div
          animate={{ rotate: expanded ? 0 : -90 }}
          transition={{ duration: 0.3 }}
        >
          <FaAngleDown className="text-gray-400" />
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
            className={className}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};