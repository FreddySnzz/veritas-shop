'use client';

import { BackButton } from "../buttons/BackButtom";
import { CustomButton } from "../buttons/CustomButton";
import { useRouter } from "next/navigation";
import { CrossOutline } from "../icons/CrossIcon";
import { CountBall, CountBallA } from "../icons/CountBallIcon";
import { CordSpool } from "../icons/CordIcon";
import { Intersection } from "../icons/IntersectionIcon";

export default function ManageCustomizationItemsLayout() {
  const router = useRouter();

  return (
    <div className="flex flex-col font-sans h-full overflow-hidden">
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mx-4 overflow-y-auto content-start pb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mx-2">
          <CustomButton
            className="flex-col shadow-lg shadow-secondary/5 border py-8"
            onClick={() => router.push('/admin/estoques/itens-personalizacao/cordoes')}
          >
            <CordSpool className="w-6 h-6" />
            <span>Cordões</span>
          </CustomButton>

          <CustomButton
            className="flex-col shadow-lg shadow-secondary/5 border py-8"
            onClick={() => router.push('/admin/estoques/itens-personalizacao/contas')}
          >
            <CountBall className="w-7 h-7" />
            <span>Contas</span>
          </CustomButton>

          <CustomButton
            className="flex-col shadow-lg shadow-secondary/5 border py-8"
            onClick={() => router.push('/admin/estoques/itens-personalizacao/letras')}
          >
            <CountBallA className="w-6 h-6" />
            <span>Letras</span>
          </CustomButton>

          <CustomButton
            className="flex-col shadow-lg shadow-secondary/5 border py-8"
            onClick={() => router.push('/admin/estoques/itens-personalizacao/crucifixos')}
          >
            <CrossOutline className="w-6 h-6" />
            <span>Crucifixos</span>
          </CustomButton>

          <CustomButton
            className="flex-col shadow-lg shadow-secondary/5 border py-8"
            onClick={() => router.push('/admin/estoques/itens-personalizacao/entremeios')}
          >
            <Intersection className="w-7 h-7" />
            <span>Entremeios</span>
          </CustomButton>
        </div>
      </div>

      <div className="shrink-0 mt-auto bg-background-alternative pt-2 z-10">
        <hr className="border-muted-foreground/50 mb-4 mx-6" />
        <div className="flex flex-col mx-6 my-4 gap-4">
          <BackButton pushRoute="/admin/estoques" />
        </div>
      </div>
    </div>
  );
};