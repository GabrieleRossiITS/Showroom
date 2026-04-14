import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import {
    LogOut,
    ChevronDown,
    ShoppingBag,
    Ticket,
    Settings,
} from "lucide-react";

const LANGUAGES = [
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "pt", label: "Português", flag: "🇵🇹" },
    { code: "ja", label: "日本語", flag: "🇯🇵" },
];

export default function Header() {
    const { t, i18n } = useTranslation();
    const { user, logout, isAuthenticated } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    // Language dropdown state
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    // User dropdown state
    const [userOpen, setUserOpen] = useState(false);
    const userRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { to: "/artists", label: t("nav.artist") },
        { to: "/artworks", label: t("nav.artworks") },
        { to: "/exhibitions", label: t("nav.exhibitions") },
        { to: "/shop", label: t("nav.shop") },
        { to: "/about", label: t("nav.about") },
    ];

    const currentLang =
        LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

    const selectLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setLangOpen(false);
    };

    // Close dropdowns on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node))
                setLangOpen(false);
            if (userRef.current && !userRef.current.contains(e.target as Node))
                setUserOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Close dropdowns on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setLangOpen(false);
                setUserOpen(false);
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    const handleLogout = async () => {
        await logout();
        setUserOpen(false);
        navigate({ to: "/" });
    };

    const displayName = user
        ? [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || user.email
        : "";

    const initials = user
        ? (user.firstName.charAt(0) + user.lastName.charAt(0))
            .toUpperCase()
            .trim() || "U"
        : "U";

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
            {/* ── Logo ── */}
            <button
                aria-label="Robert Doisneau - Home"
                className="text-md font-bold tracking-widest uppercase cursor-pointer hover:text-(--burnished-copper) transition-colors duration-300"
                onClick={() => navigate({ to: "/" })}
            >
                Pixel Voyage
            </button>

            {/* ── Nav + controls ── */}
            <nav className="flex items-center gap-6 lg:gap-10" aria-label="Main navigation">
                {/* Nav links */}
                <ul className="hidden md:flex gap-6 lg:gap-10 text-md">
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

                    {/* Login link when not authenticated */}
                    {!isAuthenticated && (
                        <li>
                            <Link
                                to="/login"
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
                                {t("nav.login")}
                            </Link>
                        </li>
                    )}
                </ul>

                {/* ── User dropdown (when authenticated) ── */}
                {isAuthenticated && user && (
                    <>
                        <div className="relative" ref={userRef}>
                            <button
                                onClick={() => setUserOpen(!userOpen)}
                                aria-expanded={userOpen}
                                aria-haspopup="menu"
                                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-(--burnished-copper)/20 hover:border-(--burnished-copper)/40 transition-all duration-300 cursor-pointer group"
                            >
                                {/* Avatar circle */}
                                <span className="w-7 h-7 rounded-full bg-(--burnished-copper)/20 border border-(--burnished-copper)/40 flex items-center justify-center text-[11px] font-black text-(--burnished-copper) group-hover:bg-(--burnished-copper) group-hover:text-white transition-all duration-300">
                                    {initials}
                                </span>
                                <span className="hidden sm:block text-sm font-bold text-(--vintage-sepia) max-w-[120px] truncate">
                                    {displayName}
                                </span>
                                <ChevronDown
                                    className={`w-3.5 h-3.5 text-(--parisian-stone) transition-transform duration-200 ${userOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {userOpen && (
                                <div
                                    role="menu"
                                    className="absolute right-0 mt-3 w-52 py-2 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-100"
                                >
                                    <div className="px-4 py-3 border-b border-white/10">
                                        <p className="text-xs font-bold text-(--vintage-sepia-light) truncate">
                                            {displayName}
                                        </p>
                                        <p className="text-[10px] text-white/40 truncate mt-0.5">
                                            {user.email}
                                        </p>
                                    </div>

                                    {[
                                        {
                                            to: "/account",
                                            icon: <Settings className="w-4 h-4" />,
                                            label: t("account.myAccount", "Il mio account"),
                                        },
                                        {
                                            to: "/account",
                                            icon: <ShoppingBag className="w-4 h-4" />,
                                            label: t("account.orders", "Ordini"),
                                        },
                                        {
                                            to: "/account",
                                            icon: <Ticket className="w-4 h-4" />,
                                            label: t("account.tickets", "Biglietti"),
                                        },
                                    ].map((item) => (
                                        <Link
                                            key={item.label}
                                            to={item.to}
                                            role="menuitem"
                                            onClick={() => setUserOpen(false)}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-(--vintage-sepia) hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                                        >
                                            <span className="text-(--burnished-copper) opacity-70">
                                                {item.icon}
                                            </span>
                                            {item.label}
                                        </Link>
                                    ))}

                                    <div className="mt-1 pt-1 border-t border-white/10">
                                        <button
                                            role="menuitem"
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200 cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            {t("nav.logout", "Esci")}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => navigate({ to: "/cart" })}
                            aria-label={t("nav.cart")}
                            className="
                    relative flex items-center justify-center
                        w-10 h-10 rounded-full
                        bg-white/10 border border-white/20
                        hover:bg-(--burnished-copper)/20 hover:border-(--burnished-copper)/40
                        transition-all duration-300 cursor-pointer group
                    "
                        >
                            <ShoppingBag className="w-5 h-5 text-(--vintage-sepia) group-hover:text-(--burnished-copper) transition-colors" />
                            {cart && cart.items.length > 0 && (
                                <span className="
                            absolute -top-1 -right-1
                            min-w-[18px] h-[18px] px-1
                            bg-(--burnished-copper) text-white
                            text-[10px] font-black rounded-full
                            flex items-center justify-center
                            shadow-lg shadow-black/20
                            animate-in zoom-in duration-300
                        ">
                                    {cart.items.length}
                                </span>
                            )}
                        </button>
                    </>
                )}
                {/* ── Language selector ── */}
                <div className="relative" ref={langRef}>
                    <button
                        aria-label={t("nav.selectLanguage")}
                        aria-haspopup="listbox"
                        aria-expanded={langOpen}
                        onClick={() => setLangOpen(!langOpen)}
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

                    {langOpen && (
                        <div
                            role="listbox"
                            className="absolute right-0 mt-3 w-44 py-2 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-100"
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
                                        ${i18n.language === lang.code
                                            ? "bg-(--burnished-copper)/30 text-(--burnished-copper) font-bold"
                                            : "text-(--vintage-sepia) hover:bg-white/10"
                                        }
                                    `}
                                >
                                    <span className="text-base">{lang.flag}</span>
                                    <span className="font-mono tracking-wider">{lang.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
