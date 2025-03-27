"use client";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

const Nav = () => {
    return (
        <div className="flex justify-between px-10 py-8">
            <Link href="/">
                <h2 className="text-xl font-extrabold">Text Behind Image</h2>
            </Link>
            <ThemeToggler />
        </div>
    );
};

export default Nav;
