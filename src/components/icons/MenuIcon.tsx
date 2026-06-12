import { motion } from "framer-motion";

interface MenuIconProps extends React.HTMLAttributes<HTMLElement> {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export function MenuIcon({ isMenuOpen, toggleMenu }: MenuIconProps) {
  return (
    <button
      onClick={toggleMenu}
      className="flex items-center justify-center w-10 h-10 rounded-md focus:outline-none cursor-pointer"
      aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={`stroke-secondary hover:stroke-secondary/70 transition-colors 
          dark:stroke-background-alternative-v2 dark:hover:stroke-background-alternative-v2/70`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={isMenuOpen ? "open" : "closed"}
        animate={isMenuOpen ? "open" : "closed"}
      >
        <motion.path
          d="M 3 6 L 21 6"
          variants={{
            closed: { d: "M 8 6 L 21 6" },
            open: { d: "M 6 6 L 18 18" }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        
        <motion.path
          d="M 3 12 L 21 12"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
        
        <motion.path
          d="M 3 6 L 21 6"
          variants={{
            closed: { d: "M 3 18 L 16 18" },
            open: { d: "M 6 18 L 18 6" }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </motion.svg>
    </button>
  );
}