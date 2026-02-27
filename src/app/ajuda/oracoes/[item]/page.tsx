import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { getCachedAdminInfoAction } from "@/app/actions/cache.actions";
import { 
  commonPrayers, 
  rosary, 
  specificPrayers 
} from "@/data/constants/prayers";

interface PageProps {
  params: Promise<{
    item: string;
  }>;
};

export default async function PrayPage({ params }: PageProps) {
  const { user } = await getCachedAdminInfoAction();
  const { item } = await params;
  console.log(item)
  const allPrayers = [...commonPrayers, ...specificPrayers, ...rosary];
  const pray = allPrayers.find(
    (pray) => console.log(pray)
  ); 

  if (!pray) {
    notFound();
  };

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative">
      <Header mode="user" />
      <main className="flex-1 flex flex-col">
        <div className="flex flex-col items-center justify-center">
          {/* <h1>{prayer?.title}</h1>
          <p>{prayer?.prayer}</p> */}
        </div>
      </main>
      <Footer 
        whatsappNumber={user?.phone || '5586994379414'}
      />
    </div>
  );
};