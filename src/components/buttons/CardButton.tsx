'use client'

import { CustomLink } from "./CustomLink";

interface CardButtonProps extends React.HTMLAttributes<HTMLElement> {
  pushRoute: string;
  children: React.ReactNode;
  className?: string;
};

export default function CardButton(props: CardButtonProps) {
  return (
    <CustomLink
      href={props.pushRoute}
      aria-label="Ver detalhes"
      className={`relative flex p-4 rounded-2xl h-fit cursor-pointer ${props.className}`}
    >
      {props.children}
    </CustomLink>
  );
};