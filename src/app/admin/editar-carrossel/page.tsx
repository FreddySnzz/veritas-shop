import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import ManageCatalogImages from "@/components/admin/ManageCatalogImages";

export default function ManageCatalogImagesPage() {
  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="admin" />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden">
        <div className="shrink-0">
          <DynamicBreadcrumb className="mt-12 p-6" />
          <hr className="border-muted-foreground/50 mb-4 mx-6" />
        </div>
        <ManageCatalogImages className="flex-1 overflow-hidden" />
      </main>
    </div>
  );
};