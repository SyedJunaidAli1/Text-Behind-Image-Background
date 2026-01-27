"use client";
import Link from "next/link";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Footer = () => {
  return (
    <motion.footer
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full py-4 flex justify-center items-center border-t border-gray-700"
    >
      <div className="flex gap-6 text-sm">
        {[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms & Conditions", href: "/terms" },
          { label: "About", href: "/about" },
        ].map((link) => (
          <motion.div
            key={link.href}
            variants={item}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Link href={link.href}>
              <span className="hover:text-gray-400 transition-colors duration-300 cursor-pointer">
                {link.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.footer>
  );
};

export default Footer;
