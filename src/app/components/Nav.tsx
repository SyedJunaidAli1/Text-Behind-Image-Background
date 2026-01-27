"use client";
import Link from "next/link";
import { motion } from "motion/react";
import ThemeToggler from "./ThemeToggler";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Nav = () => {
  return (
    <motion.div
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-between items-center px-10 py-8"
    >
      <Link href="/">
        <motion.h2
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          className="text-xl font-extrabold cursor-pointer"
        >
          Text Behind Image
        </motion.h2>
      </Link>

      <motion.div whileHover={{ rotate: 10 }}>
        <ThemeToggler />
      </motion.div>
    </motion.div>
  );
};

export default Nav;
