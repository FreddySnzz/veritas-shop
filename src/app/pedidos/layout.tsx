'use client';

import { useAuth } from "@/data/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  const isLoginPage = pathname === '/login';
  
  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.replace('/login');
    };
  }, [isAuthenticated, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  };

  if (!isAuthenticated) {
    return null;
  };

  return <>{children}</>;
};