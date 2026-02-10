import { Header } from "@/components/Header";
import { 
  getCachedCatalogImagesAction, 
  getCachedProductsAction 
} from "./actions/cache.actions";
import CatalogLayout from "@/components/CatalogLayout";
import CatalogCarrousel from "@/components/CatalogCarrousel";
import { PageFadeInAnimationWrapper } from "@/components/PageFadeInAnimationWrapper";
import { WhatsAppButtonFixed } from "@/components/buttons/WhatsAppButton";
import ProductModel from "@/data/models/Product.model";
import CatalogImageModel from "@/data/models/CatalogImage.model";
import Footer from "../components/Footer";

export default async function Home() {
  const products = await getCachedProductsAction();
  const availableProducts = products?.filter((product: ProductModel) => product.available);
  const images = await getCachedCatalogImagesAction();
  const availableImages = images?.filter((img: CatalogImageModel) => img.available);

  return (
    <section 
      id="home-catalog" 
      className="flex flex-col h-dvh overflow-hidden"
    >
      <Header 
        mode="user" 
        search 
        data={availableProducts}
      />

      <main className="flex-1 flex flex-col bg-background-alternative overflow-y-auto scrollbar-hide">
        <PageFadeInAnimationWrapper>
          <CatalogCarrousel 
            images={availableImages}
            className="mt-14"
          />
          <CatalogLayout 
            products={availableProducts} 
          />
        </PageFadeInAnimationWrapper>
        
        <Footer />
      </main>
      
      <WhatsAppButtonFixed 
        message={"https://wa.me/5586994379414?text=Olá, gostaria de fazer um orçamento 😄!"} 
      />
    </section>
  );
};
