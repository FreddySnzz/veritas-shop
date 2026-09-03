import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import UserLayout from "@/components/UserLayout";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";

export default async function UserPage() {
  return (
    <div className="flex flex-col h-dvh overflow-y-auto bg-background-alternative dark:bg-background-dark">
      <Header mode="user" />
      <main className="flex-1 flex flex-col px-8 md:px-12 lg:px-32">
        <div className="shrink-0 mb-6">
          <DynamicBreadcrumb className="mt-14 py-4 md:mt-16 md:py-6" />
          <hr className="border-muted-foreground/50" />
        </div>
        <UserLayout />
      </main>
      <Footer />
    </div>
  );
};