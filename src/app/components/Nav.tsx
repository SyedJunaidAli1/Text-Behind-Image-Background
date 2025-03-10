"use client";
import ThemeToggler from "./ThemeToggler";

const Nav = () => {
    return (
        <div className="flex justify-between px-10 py-8">
            <h2 className="text-xl font-extrabold">Text Behind Image</h2>
            <ThemeToggler />
        </div>
    );
};

export default Nav;
