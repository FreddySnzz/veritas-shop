import ImageCarousel from "@/components/Carrousel";
import { Header } from "@/components/Header";
import Footer from "../components/Footer";
import Catalog from "@/components/Catalog";
import { PageFadeInAnimationWrapper } from "@/components/PageFadeInAnimationWrapper";
import { WhatsAppButtonFixed } from "@/components/buttons/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header mode="user" />
      <section id="home-catalog" className="flex flex-col justify-center items-center bg-background-alternative">
        <main className="w-full h-auto">
          <PageFadeInAnimationWrapper>
            <section id="carrousel">
              <ImageCarousel className="mt-14"/>
            </section>

            <section id="products">
              <Catalog />
            </section>
          </PageFadeInAnimationWrapper>
        </main>
        
        <WhatsAppButtonFixed message={"https://wa.me/5586994379414?text=Olá, gostaria de fazer um orçamento 😄!"} />
        <Footer />
      </section>
    </>
  );
}
