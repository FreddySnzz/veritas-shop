import "../styles/globals.css";
import type { Metadata } from "next";
import { geistMono, geistSans, playfair, space } from "../styles/fonts";
import { CustomizationProvider } from "@/data/context/CustomizationContext";
import { AuthProvider } from "@/data/context/AuthContext";
import { CartProvider } from "@/data/context/CartContext";
import { Toaster } from "sonner";
import { AppProvider } from "@/data/context/AppContext";

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
      <body
        className={`${playfair.variable} ${space.variable} ${geistMono.variable} 
          ${geistSans.variable} antialiased font-playfair-display`}
      >
        <AuthProvider>
          <CartProvider>
            <CustomizationProvider>
              <AppProvider>
                {children}
                <Toaster />
              </AppProvider>
            </CustomizationProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}