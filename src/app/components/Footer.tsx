import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-4 flex justify-center items-center border-t border-gray-700 animate-fadeIn">
      <div className="flex gap-6 text-sm animate-slideUp">
        <Link href="/privacy">
          <span className="hover:text-gray-400 transition-colors duration-300">
            Privacy Policy
          </span>
        </Link>
        <Link href="/terms">
          <span className="hover:text-gray-400 transition-colors duration-300">
            Terms & Conditions
          </span>
        </Link>
        <Link href="/about">
          <span className="hover:text-gray-400 transition-colors duration-300">
            About
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
