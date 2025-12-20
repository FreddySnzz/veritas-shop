'use client';

import "../styles/globals.css";
// import type { Metadata } from "next";
import { geistMono, geistSans, playfair, space } from "../styles/fonts";
import dynamic from "next/dynamic";

const CustomizationProviderNoSSR = dynamic(
  () => import("@/data/context/CustomizationContext").then((mod) => mod.CustomizationProvider),
  { ssr: false }
);

// export const metadata: Metadata = {
//   title: "Veritas Ateliê",
//   description: "Na simplicidade, a verdade florece!",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <CustomizationProviderNoSSR>
        <body
          className={`${playfair.variable} ${space.variable} ${geistMono.variable} ${geistSans.variable} antialiased font-playfair-display`}
        >
          {children}
        </body>
      </CustomizationProviderNoSSR>
    </html>
  );
}
