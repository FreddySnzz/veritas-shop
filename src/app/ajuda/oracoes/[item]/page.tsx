import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { getCachedAdminInfoAction } from "@/app/actions/cache.actions";
import { 
  commonPrayers, 
  various, 
  specificPrayers 
} from "@/data/constants/prayers";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import PrayContent from "@/components/PrayContent";

interface PageProps {
  params: Promise<{
    item: string;
  }>;
};

export default async function PrayPage({ params }: PageProps) {
  const { user } = await getCachedAdminInfoAction();
  const { item } = await params;
  const allPrayers = [...commonPrayers, ...specificPrayers, ...various];
  const pray = allPrayers.find(
    (pray) => pray.href === `/${item}`
  ); 

  if (!pray) {
    notFound();
  };

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative">
      <Header mode="user" />
      <main className="flex-1 flex flex-col px-8 md:px-12 lg:px-32">
        <div className="shrink-0 mb-8">
          <DynamicBreadcrumb className="mt-14 py-4 md:mt-16 md:py-6" />
          <hr className="border-muted-foreground/50" />
        </div>
        <PrayContent pray={pray} />
      </main>
      <Footer 
        whatsappNumber={user?.phone || '5586994379414'}
      />
    </div>
  );
};