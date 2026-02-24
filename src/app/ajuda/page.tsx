import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import HelpLayout from "@/components/HelpLayout";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { getCachedAdminInfoAction } from "../actions/cache.actions";

export default async function HelpPage() {
  const { user } = await getCachedAdminInfoAction();

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative">
      <Header mode="user" />
      <main className="flex-1 flex flex-col px-8 md:px-12 lg:px-32">
        <div className="shrink-0 mb-8 md:mb-8 lg:mb-12">
          <DynamicBreadcrumb className="mt-14 py-4 md:mt-16 md:py-6" />
          <hr className="border-muted-foreground/50" />
        </div>
        <HelpLayout />
      </main>
      <Footer 
        whatsappNumber={user?.phone || '5586994379414'}
      />
    </div>
  );
};
