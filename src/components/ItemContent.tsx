import Link from "next/link";

interface ItemContentProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
  href?: string;
  className?: string;
};

export default function ItemContent({ 
  children,
  icon,
  label, 
  href,
  className,
}: ItemContentProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={`flex w-full items-center gap-3 p-1 rounded-lg 
          text-gray-300 hover:bg-slate-800 hover:text-white
        `}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  } else if (!href) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
};
