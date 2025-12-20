'use client';

import * as motion from "motion/react-client"
import Footer from "../components/Footer";
import { SlogganTypography, Typography } from "../components/Typography";
import ButtonScrollDown from "@/components/buttons/ButtonScrollDown";
import { WhatsAppButtonFixed } from "@/components/buttons/WhatsAppButton";
import openLinkOnButton from "@/data/functions/openNewWindowButton";
import ImageCarousel from "@/components/Carrousel";
import About from "@/components/About";
import { PhraseSloganAlternative } from "@/components/Phrases";
import { CatalogButton } from "@/components/buttons/CatalogButton";

export default function Home() {
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
          <SlogganTypography  />
          <div className="flex flex-col items-center justify-center my-4">
            <ButtonScrollDown className="text-secondary" section="carrousel" /> 
          </div>

          <PhraseSloganAlternative className="bg-primary/50" />

          <section id="carrousel">
            <ImageCarousel className="h-screen"/>
          </section>

          <div className="flex flex-col items-center justify-center mt-4">
            <ButtonScrollDown className="text-secondary" section="about" /> 
          </div>
        </motion.div>
      </main>

      <About />

      <div className="w-full md:w-1/2 p-4 mb-8">
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
      
      <WhatsAppButtonFixed message={() => openLinkOnButton("https://wa.me/5586994379414?text=Olá, gostaria de fazer um pedido de Terço Personalizado!")} />
      <Footer />
    </section>
  );
}
