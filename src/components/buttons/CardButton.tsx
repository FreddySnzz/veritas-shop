'use client'

import { useRouter } from "next/navigation";

interface CardButtonProps extends React.HTMLAttributes<HTMLElement> {
  pushRoute: string;
  children: React.ReactNode;
  className?: string;
};

export default function CardButton(props: CardButtonProps) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(props.pushRoute)}
      className={`relative flex p-4 rounded-2xl h-fit cursor-pointer ${props.className}`}
    >
      {props.children}
    </div>
  );
};