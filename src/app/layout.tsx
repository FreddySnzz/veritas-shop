import "../styles/globals.css";
import type { Metadata } from "next";
import { geistMono, geistSans, playfair, space } from "../styles/fonts";
import { AppProvider } from "../data/context/AppContext";
import { CustomizationProvider } from "@/data/context/CustomizationContext";

export const metadata: Metadata = {
  title: "Veritas Ateliê",
  description: "Na simplicidade, a verdade florece!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <AppProvider>
        <CustomizationProvider>
          <body
            className={`${playfair.variable} ${space.variable} ${geistMono.variable} ${geistSans.variable} antialiased font-playfair-display`}
          >
            {children}
          </body>
        </CustomizationProvider>
      </AppProvider>
    </html>
  );
}
