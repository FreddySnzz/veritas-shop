import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { CustomizationItemForm } from "@/components/admin/CustomizationItemForm";

interface PageProps {
  params: Promise<{
    mode: string;
  }>;
};

export default async function AddProductCatalogPage({ params }: PageProps) {
  const { mode } = await params;

  if (mode !== 'adicionar') {
    notFound();
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="admin" />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden">
        <div className="shrink-0">
          <DynamicBreadcrumb className="mt-12 p-6" />
        </div>
        <CustomizationItemForm mode={mode} />
      </main>
    </div>
  );
};