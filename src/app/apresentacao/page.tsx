import Footer from "@/components/Footer";
import { getCachedCatalogImagesAction } from "../actions/cache.actions";
import CatalogImageModel from "@/data/models/CatalogImage.model";
import { Header } from "@/components/Header";
import Apresentation from "@/components/Apresentation";

export default async function Home() {
  const images = await getCachedCatalogImagesAction();
  const availableImages = images.filter((img: CatalogImageModel) => img.available);

  return (
    <>
      <Header mode="user" />
      <main>
        <Apresentation images={availableImages} />
      </main>
      <Footer />
    </>
  );
}
