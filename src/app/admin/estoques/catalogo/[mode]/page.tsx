import { Header } from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { ProductForm } from "@/components/admin/ProductCatalogForm";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ mode: 'adicionar' }, { mode: 'editar' }];
};

export default async function AddProductCatalogPage({ 
  params 
}: { 
  params: Promise<{ mode: string }> 
}) {
  const { mode } = await params;

  if (mode !== 'adicionar' && mode !== 'editar') {
    notFound();
  };
  
  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="admin" />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden">
        <div className="shrink-0">
          <DynamicBreadcrumb className="mt-12 p-6" />
          <hr className="border-muted-foreground/50 mb-4 mx-6" />
        </div>
        <ProductForm initialData={null} />
      </main>
    </div>
  );
};