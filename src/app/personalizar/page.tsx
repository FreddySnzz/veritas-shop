import RosarioCatalog from "@/components/Catalog";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Catalog() {
  return (
    <>
      <Header />
      <main className="flex flex-col h-auto max-w-screen justify-center items-center bg-background-alternative overflow-hidden">
        <RosarioCatalog />
      </main>
      <Footer />
    </>
  );
}
