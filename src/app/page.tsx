'use client';

import * as motion from "motion/react-client"
import Footer from "../components/Footer";
import { SlogganTypography, Typography } from "../components/Typography";
import ButtonScrollDown from "@/components/buttons/ButtonScrollDown";
import { WhatsAppButtonFixed } from "@/components/buttons/WhatsAppButton";
import openLinkOnButton from "@/data/functions/openNewWindowButton";
import ImageCarousel from "@/components/Carrousel";
import About from "@/components/About";
import { PhraseVerse } from "@/components/Phrases";
import { CatalogButton } from "@/components/buttons/CatalogButton";
import { Header } from "@/components/Header";
import Catalog from "@/components/Catalog";

export default function Home() {
  return (
    <>
      <Header />
      <section id="home" className="flex flex-col justify-center items-center bg-background-alternative">
        <main className="w-full h-auto">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <section id="carrousel">
              <ImageCarousel className="mt-18"/>
            </section>

            <section id="products">
              <Catalog className="" />
            </section>
          </motion.div>
        </main>
        
        <WhatsAppButtonFixed message={() => openLinkOnButton("https://wa.me/5586994379414?text=Olá, gostaria de fazer um pedido de Terço Personalizado!")} />
        <Footer />
      </section>
    </>
  );
}
