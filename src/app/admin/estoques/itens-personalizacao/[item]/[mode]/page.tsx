import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { CustomizationItemForm } from "@/components/admin/CustomizationItemForm";
import { ItemsCustomizationTypes } from "@/data/types/customization.type";

interface PageProps {
  params: Promise<{
    item: string;
    mode: string;
  }>;
};

export default async function AddCustomizationItemPage({ params }: PageProps) {
  const { mode, item } = await params;
  const isValidItem = item in ItemsCustomizationTypes;
  
  if (!isValidItem) {
    notFound();
  };

  if (mode !== 'adicionar' && mode !== 'editar') {
    notFound();
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="admin" />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden">
        <div className="shrink-0">
          <DynamicBreadcrumb className="mt-12 p-6" />
        </div>
        <CustomizationItemForm 
          mode={mode} 
          itemType={item as keyof typeof ItemsCustomizationTypes}
        />
      </main>
    </div>
  );
};