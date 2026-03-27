import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "jp", label: "日本語", flag: "🇯🇵" },
];

function redirectHome() {
    window.location.href = "/";
}

export default function Header() {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { to: "/artworks", label: t("nav.artworks") },
        { to: "/artist", label: t("nav.artist") },
        { to: "/exhibitions", label: t("nav.exhibitions") },
        { to: "/about", label: t("nav.about") },
    ];

    const currentLang =
        LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

    const selectLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!open) return;

        if (e.key === "Escape") {
            setOpen(false);
            const trigger = menuRef.current?.querySelector(
                '[aria-haspopup="listbox"]',
            ) as HTMLButtonElement | null;
            trigger?.focus();
            return;
        }

        const buttons = Array.from(
            menuRef.current?.querySelectorAll('[role="option"]') || [],
        ) as HTMLButtonElement[];
        if (buttons.length === 0) return;

        const currentIndex = buttons.findIndex(
            (b) => document.activeElement === b,
        );

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextIndex =
                currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
            buttons[nextIndex]?.focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prevIndex =
                currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
            buttons[prevIndex]?.focus();
        }
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as any)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <header
            className="
                fixed top-0 left-0 right-0 
                mt-4 mx-4
                py-5 px-10 md:px-14
                z-50 
                rounded-4xl 
                bg-black/40 border border-white/10 
                backdrop-blur-md shadow-lg
                flex justify-between items-center 
                text-(--vintage-sepia)
            "
        >
            <button
                aria-label="Robert Doisneau - Home"
                className="text-md font-bold tracking-widest uppercase cursor-pointer hover:text-(--burnished-copper) transition-colors duration-300"
                onClick={redirectHome}
            >
                Robert Doisneau
            </button>
            <nav
                className="flex items-center gap-8 lg:gap-12"
                aria-label="Main navigation"
            >
                <ul className="flex gap-8 lg:gap-12 text-md">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className="
                                    text-(--vintage-sepia) font-semibold tracking-wide drop-shadow-sm
                                    hover:text-(--burnished-copper) transition-colors duration-300 
                                    relative py-1
                                    
                                    after:content-[''] after:block after:absolute after:w-full 
                                    after:h-[2px] after:-bottom-1.5 after:bg-(--burnished-copper) 
                                    after:rounded-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300
                                    hover:after:scale-x-100
                                    
                                    [&.active]:text-(--burnished-copper) [&.active]:after:scale-x-100
                                "
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Language Selector Dropdown */}
                <div
                    className="relative"
                    ref={menuRef}
                    onKeyDown={handleKeyDown}
                >
                    <button
                        aria-label="Select language"
                        aria-haspopup="listbox"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                        className="
                            flex items-center gap-2
                            text-xs font-mono font-bold uppercase tracking-widest
                            px-3 py-1.5 rounded-full
                            border border-white/20 bg-white/10
                            hover:bg-(--burnished-copper) hover:text-white hover:border-(--burnished-copper)
                            transition-all duration-300 cursor-pointer
                        "
                    >
                        <span>{currentLang.flag}</span>
                        <span>{currentLang.code.toUpperCase()}</span>
                    </button>

                    {open && (
                        <div
                            role="listbox"
                            className="absolute right-0 mt-3 w-44 py-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-100"
                        >
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    role="option"
                                    aria-selected={i18n.language === lang.code}
                                    onClick={() => selectLanguage(lang.code)}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left
                                        transition-colors duration-200 cursor-pointer
                                        ${
                                            i18n.language === lang.code
                                                ? "bg-(--burnished-copper)/30 text-(--burnished-copper) font-bold"
                                                : "text-(--vintage-sepia) hover:bg-white/10"
                                        }
                                    `}
                                >
                                    <span className="text-base">
                                        {lang.flag}
                                    </span>
                                    <span className="font-mono tracking-wider">
                                        {lang.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
