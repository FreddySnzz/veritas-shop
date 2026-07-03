import "../styles/globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { geistMono, geistSans, playfair, space } from "../styles/fonts";
import { CustomizationProvider } from "@/data/context/CustomizationContext";
import { AuthProvider } from "@/data/context/AuthContext";
import { CartProvider } from "@/data/context/CartContext";
import { Toaster } from "sonner";
import { AppProvider } from "@/data/context/AppContext";
import { ThemeProvider } from "@/data/context/ThemeContext";
import InstallPrompt from "@/components/modals/InstallPromptModal";
import { decodeJwt } from "jose";
import { User } from "@/data/types/auth";

export const metadata: Metadata = {
  title: "Veritas Ateliê",
  description: "Na simplicidade, a verdade florece!",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('veritas_token')?.value;
  let currentUser = null;

  if (token) {
    try {
      const payload = decodeJwt(token); 
      currentUser = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        role: payload.role,
      }
    } catch (e) {
      console.error("Erro ao ler token no layout", e);
    }
  }

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${space.variable} ${geistMono.variable} 
          ${geistSans.variable} antialiased font-playfair-display`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <AuthProvider initialUser={currentUser as User}>
            <CartProvider>
              <CustomizationProvider>
                <AppProvider>
                  {children}
                  <Toaster />
                  <InstallPrompt />
                </AppProvider>
              </CustomizationProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}