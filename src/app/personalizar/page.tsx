'use client'

import RosarioWizard from "@/components/Customization";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { useMediaQuery } from "@/data/hook/useMediaQuery";

export default function Customization() {
  const isMdDown = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-[92vh] max-w-screen bg-background-alternative overflow-hidden">
        <RosarioWizard />
      </main>
      {isMdDown && <Footer />}
    </>
  );
}
