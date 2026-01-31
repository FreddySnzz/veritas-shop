import { Header } from "@/components/Header";
import { 
  getCachedCatalogImagesAction, 
  getCachedProductsAction 
} from "./actions/cache.actions";
import CatalogCarrousel from "@/components/CatalogCarrousel";
import Catalog from "@/components/Catalog";
import { PageFadeInAnimationWrapper } from "@/components/PageFadeInAnimationWrapper";
import { WhatsAppButtonFixed } from "@/components/buttons/WhatsAppButton";
import CatalogImageModel from "@/data/models/CatalogImage.model";
import Footer from "../components/Footer";

export default async function Home() {
  const products = await getCachedProductsAction();
  const images = await getCachedCatalogImagesAction();
  const availableImages = images.filter((img: CatalogImageModel) => img.available);

  return (
    <>
      <Header mode="user" />
      <section id="home-catalog" className="flex flex-col justify-center items-center bg-background-alternative">
        <main className="w-full h-auto">
          <PageFadeInAnimationWrapper>
            <section id="carrousel">
              <CatalogCarrousel 
                images={availableImages}
                className="mt-14"
              />
            </section>

            <section id="products">
              <Catalog products={products} />
            </section>
          </PageFadeInAnimationWrapper>
        </main>
        
        <WhatsAppButtonFixed message={"https://wa.me/5586994379414?text=Olá, gostaria de fazer um orçamento 😄!"} />
        <Footer />
      </section>
    </>
  );
}
