'use client'

import RosarioWizard from "@/components/Customization";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { useMediaQuery } from "@/data/hook/useMediaQuery";

export default function Customization() {
  const isMdDown = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex flex-col min-h-screen max-w-screen">
      <Header mode="user" />
      <main className="grow mt-16 bg-background-alternative">
        <RosarioWizard />
      </main>
      {isMdDown && <Footer />}
    </div>
  );
}
