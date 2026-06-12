import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import PanelLayout from "@/components/admin/PanelLayout";
import Footer from "@/components/Footer";
import { 
  getCachedAdminInfoAction, 
  getCachedCustomizationItemsCategoriesAction 
} from "../actions/cache.actions";

export default async function AdminPanel() {
  const user  = await getCachedAdminInfoAction();
  const categories = await getCachedCustomizationItemsCategoriesAction();

  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative dark:bg-background-dark">
      <div className="flex flex-col shrink-0 h-dvh">
        <Header mode="admin" />
        <main className={`flex-1 flex flex-col px-4 pb-4 mt-20
          md:px-12 md:mt-0 lg:px-16 overflow-hidden`}
        >
          <div className="hidden md:block shrink-0 md:mb-8 lg:mb-12">
            <DynamicBreadcrumb className="mt-16 py-4" />
            <hr className="border-muted-foreground/50" />
          </div>
          <PanelLayout 
            categories={categories}
            className="flex-1 overflow-hidden" 
          />
        </main>
      </div>
      <div className="hidden lg:block shrink-0">
        <Footer 
          whatsappNumber={user?.phone || '5586994379414'}
        />
      </div>
    </div>
  );
};