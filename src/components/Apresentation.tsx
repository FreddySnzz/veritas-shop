'use client';

import { useEffect, useState } from "react";
import * as motion from "motion/react-client"
import About from "./About";
import { SlogganTypography, Typography } from "./Typography";
import ButtonScrollDown from "./buttons/ButtonScrollDown";
import { CatalogButton } from "./buttons/CatalogButton";
import { WhatsAppButtonFixed } from "./buttons/WhatsAppButton";
import UserModel from "@/data/models/User.model";
import { getCachedAdminInfoAction } from "@/app/actions/cache.actions";

export default function Apresentation() {
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCachedAdminInfoAction();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <section 
      id="home" 
      className="flex flex-col w-full h-full justify-center items-center scroll-smooth"
    >
      <div className="flex flex-col w-full h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center h-full gap-8"
        >
          <div className="flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Typography size={"lg"} />
            </motion.div>
          </div>
          <SlogganTypography />
        </motion.div>

        <div className="relative -translate-y-1/2">
          <ButtonScrollDown 
            section="about" 
            className="text-secondary " 
          /> 
        </div>
      </div>

      <section 
        id="about"
        className="flex flex-col w-full items-center justify-center mt-4"
      >
        <div className="p-6">
          <About />
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
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
      </section>

      <WhatsAppButtonFixed 
        message={`https://wa.me/${user?.phone || 
          "5586994379414"}?text=${encodeURIComponent('Olá, gostaria de fazer um pedido de Terço Personalizado!')}`
        } 
      />
    </section>
  );
};
