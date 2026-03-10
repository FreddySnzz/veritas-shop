import { Header } from "@/components/Header";
import { 
  getCachedAdminInfoAction,
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
import CatalogPrayerCard from "@/components/CatalogPrayerCard";

export default async function Home() {
  const { user } = await getCachedAdminInfoAction();
  const products = await getCachedProductsAction();
  const availableProducts = products?.filter((product: ProductModel) => product.available);
  const images = await getCachedCatalogImagesAction();
  const availableImages = images?.filter((img: CatalogImageModel) => img.available);

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative">
      <Header 
        mode="user" 
        search 
        data={availableProducts}
      />
      <main className={`flex-1 flex flex-col ${availableImages.length === 0 && 'mt-16'}`}>
        <PageFadeInAnimationWrapper>
          <CatalogCarrousel 
            images={availableImages}
            className={`${availableImages.length === 0 && 'hidden'} mt-14 md:h-[60vh]`}
          />
          <div className="px-6 md:px-12 lg:px-32">
            <CatalogLayout products={availableProducts} />
          </div>
          <div className="mt-8">
            <CatalogPrayerCard />
          </div>
        </PageFadeInAnimationWrapper>
      </main>
      <WhatsAppButtonFixed 
        message={`https://wa.me/${user?.phone || 
          '5586994379414'}?text=${encodeURIComponent('Olá, gostaria de fazer um orçamento detalhado 😄!')}`
        } 
      />
      <Footer 
        whatsappNumber={user?.phone || '5586994379414'}
      />
    </div>
  );
};
