'use client';

import * as motion from "motion/react-client"
import { SlogganTypography, Typography } from "./Typography";
import ButtonScrollDown from "./buttons/ButtonScrollDown";
import { CatalogButton } from "./buttons/CatalogButton";
import CatalogCarrousel from "./CatalogCarrousel";
import CatalogImageModel from "@/data/models/CatalogImage.model";
import About from "./About";
import { WhatsAppButtonFixed } from "./buttons/WhatsAppButton";

interface ApresentationProps {
  images: CatalogImageModel[];
  className?: string;
};

export default function Apresentation({ images }: ApresentationProps ) {
  return (
    <section id="home" className="flex flex-col justify-center items-center bg-background-alternative">
      <main className="w-full h-auto">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col h-[91vh] items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Typography size={"lg"} />
            </motion.div>
          </div>
          <SlogganTypography />
          <div className="flex flex-col items-center justify-center my-4">
            <ButtonScrollDown className="text-secondary" section="carrousel" /> 
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mb-8 md:ml-[25.5%] lg:ml-[33.5%] xl:ml-[37.5%]">
            <motion.div 
              animate={{
                scale: [0.95, 1, 0.95],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CatalogButton />
            </motion.div>
          </div>

          <section id="carrousel">
            <CatalogCarrousel 
              images={images}
              className="h-screen"
            />
          </section>

          <div className="flex flex-col items-center justify-center mt-4">
            <ButtonScrollDown className="text-secondary" section="about" /> 
          </div>
        </motion.div>
      </main>

      <About />

      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mb-8">
        <motion.div 
          animate={{
            scale: [0.95, 1, 0.95],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <CatalogButton />
        </motion.div>
      </div>
      
      <WhatsAppButtonFixed 
        message={"https://wa.me/5586994379414?text=Olá, gostaria de fazer um pedido de Terço Personalizado!"} 
      />
    </section>
  );
}
