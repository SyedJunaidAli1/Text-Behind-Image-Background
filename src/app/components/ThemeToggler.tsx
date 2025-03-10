import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="h-10 w-10"/>

    return (
        <Button
        className="text-base font-medium flex items-center gap-2"
        variant="ghost"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "light" ? <Moon/> : <Sun/>}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
    )
}

export default ThemeToggler