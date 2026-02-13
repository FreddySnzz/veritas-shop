import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import Apresentation from "@/components/Apresentation";

export default async function AboutPage() {
  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative">
      <Header mode="user" />
      <main className="flex-1 flex flex-col px-8 md:px-12 lg:px-32">
        <Apresentation />
      </main>
      <Footer />
    </div>
  );
}
