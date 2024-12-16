'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { BorderBeamDevops } from "../components/BorderBeamDevops";
import { Navbar } from "../components/Navbar";
import { RegistroForm } from "../components/RegisterForm";


export default function HomePageDevops() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-col justify-center items-center py-16 px-4 sm:px-8">
        <motion.div
          style={{ y }}
          className="text-center space-y-6 mb-12 px-4 sm:px-6 lg:px-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
          >
            Bienvenidos a Inscripción a Devops
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Este es un sistema diseñado para automatizar y simplificar el proceso de registro. Completa tus datos y experimenta cómo DevOps transforma las aplicaciones modernas.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4">
              <Link href="/pages/users">Ver Usuarios Registrados</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col w-full max-w-4xl justify-center items-center space-y-12 py-8 px-4 sm:px-8">
          <motion.div
            style={{ y }}
            className="w-full flex flex-col items-center space-y-6"
          >
            {/* <BorderBeamDevops /> */}
          </motion.div>
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
            <RegistroForm />
          </div>
        </div>
      </main>
    </div>
  );
}
