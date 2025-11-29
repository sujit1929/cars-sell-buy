"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isLight = theme === "light";

    return (
        <button
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className=" transition-colors"
            aria-label="Toggle theme"
            type="button"
        >
            {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
    );
}
