"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex justify-center px-4 py-1 mt-3 text-center"
    >
      <div className="flex flex-col justify-center items-center gap-2.5 w-[550px]">
        <motion.h1 variants={fadeUp} className="font-semibold text-3xl">
          Welcome! Start by uploading an image to get started
        </motion.h1>

        <motion.p variants={fadeUp} className="opacity-60 max-w-[80%]">
          Hide text inside images and reveal it later! Get started by uploading
          an image and adding your hidden message.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link href="/mainapp">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button>Get Started</Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
