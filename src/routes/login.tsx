import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Mail, Lock, ArrowLeft, Eye, EyeOff, User } from "lucide-react";
import Button from "#/components/ui/Button";
import { authApi } from "#/components/auth";
import { useAuth } from "#/components/contexts/AuthContext";

export const Route = createFileRoute("/login")({
    component: AuthPage,
});

function AuthPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Modalità: true = Login, false = Registrazione
    const [isLogin, setIsLogin] = useState(true);
    const { setAuth } = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset padding for immersive background
    useEffect(() => {
        const mainElement = document.getElementById("main-content");
        if (mainElement) {
            mainElement.style.padding = "0";
        }
        return () => {
            if (mainElement) {
                mainElement.style.padding = "";
            }
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isLogin) {
                // Backend sets HttpOnly JWT cookie; response is the User object
                const user = await authApi.login({ email, password });
                setAuth(user);
                navigate({ to: "/" });
            } else {
                // Backend handles auto-login and sets HttpOnly cookie during registration
                const user = await authApi.register({
                    firstName,
                    lastName,
                    email,
                    password,
                });
                setAuth(user);
                navigate({ to: "/" });
            }
        } catch (err: any) {
            setError(err.message || "Qualcosa è andato storto. Riprova.");
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const itemFadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const },
        },
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-(--vintage-sepia) relative overflow-hidden px-6">
            {/* Background Layers for Depth (Standardized Gradient) */}
            <div className="absolute inset-0 z-0 bg-linear-to-br from-(--vintage-sepia) via-(--vintage-sepia-light) to-(--parisian-stone)/20" />
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-(--burnished-copper)/5 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-(--parisian-stone)/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full max-w-lg relative z-10"
            >
                {/* Auth Card */}
                <motion.div
                    layout
                    variants={itemFadeUp}
                    className="bg-white/40 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-white/60 shadow-2xl space-y-10 relative overflow-hidden"
                >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-(--burnished-copper) via-(--parisian-stone) to-(--burnished-copper)" />

                    <div className="space-y-4">
                        <motion.h1
                            layout
                            className="text-5xl font-black text-(--deep-charcoal) font-serif italic tracking-tight"
                        >
                            {isLogin ? t("login.title") : t("register.title")}
                        </motion.h1>
                        <motion.p
                            layout
                            className="text-(--parisian-stone-dark) text-sm font-medium opacity-80 italic max-w-sm leading-relaxed"
                        >
                            {isLogin
                                ? t("login.subtitle")
                                : t("register.subtitle")}
                        </motion.p>
                    </div>

                    {/* MOSTRA L'ERRORE QUI */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-600 text-xs p-4 rounded-2xl font-medium"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="popLayout">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{
                                        opacity: 1,
                                        height: "auto",
                                        y: 0,
                                    }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-2 gap-5"
                                >
                                    <div className="space-y-2 group">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-(--parisian-stone) ml-2 transition-colors group-focus-within:text-(--burnished-copper)">
                                            {t("register.firstName")}
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--parisian-stone) opacity-50" />
                                            <input
                                                type="text"
                                                required
                                                value={firstName}
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                                className="w-full bg-white/40 border border-black/5 rounded-[1.25rem] py-4.5 pl-14 pr-5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--burnished-copper)/30 focus:bg-white transition-all outline-none"
                                                placeholder="Robert"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-(--parisian-stone) ml-2 transition-colors group-focus-within:text-(--burnished-copper)">
                                            {t("register.lastName")}
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--parisian-stone) opacity-50" />
                                            <input
                                                type="text"
                                                required
                                                value={lastName}
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                                className="w-full bg-white/40 border border-black/5 rounded-[1.25rem] py-4.5 pl-14 pr-5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--burnished-copper)/30 focus:bg-white transition-all outline-none"
                                                placeholder="Doisneau"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email Field */}
                        <motion.div layout className="space-y-2 group">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-(--parisian-stone) ml-2 transition-colors group-focus-within:text-(--burnished-copper)">
                                {t("login.email")}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--parisian-stone) opacity-50" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/40 border border-black/5 rounded-[1.25rem] py-4.5 pl-14 pr-5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--burnished-copper)/30 focus:bg-white transition-all outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div layout className="space-y-2 group">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-(--parisian-stone) ml-2 transition-colors group-focus-within:text-(--burnished-copper)">
                                {t("login.password")}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--parisian-stone) opacity-50" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full bg-white/40 border border-black/5 rounded-[1.25rem] py-4.5 pl-14 pr-14 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--burnished-copper)/30 focus:bg-white transition-all outline-none"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-(--parisian-stone) hover:text-(--deep-charcoal) transition-colors cursor-pointer"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>

                            {/* Forgot Password */}
                            <AnimatePresence>
                                {isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex justify-end pt-1"
                                    >
                                        <button
                                            type="button"
                                            className="text-[10px] font-bold uppercase tracking-widest text-(--burnished-copper) hover:text-(--burnished-copper-deep) transition-colors cursor-pointer"
                                        >
                                            {t("login.forgotPassword")}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div layout className="pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                variant="copper"
                                size="lg"
                                rounded="full"
                                className="w-full h-14 text-sm font-bold uppercase tracking-[0.2em] shadow-2xl shadow-(--burnished-copper)/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>{t("common.loading")}</span>
                                    </div>
                                ) : isLogin ? (
                                    t("login.submit")
                                ) : (
                                    t("register.submit")
                                )}
                            </Button>
                        </motion.div>
                    </form>

                    <motion.div
                        layout
                        className="pt-10 border-t border-black/5 flex flex-col items-center gap-6"
                    >
                        <p className="text-sm font-medium text-(--parisian-stone-dark)">
                            {isLogin
                                ? t("login.noAccount")
                                : t("register.hasAccount")}{" "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-(--burnished-copper) font-bold hover:underline cursor-pointer ml-1"
                            >
                                {isLogin
                                    ? t("login.signUp")
                                    : t("register.signIn")}
                            </button>
                        </p>

                        <button
                            onClick={() => navigate({ to: "/" })}
                            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-(--parisian-stone)/60 hover:text-(--deep-charcoal) transition-colors group cursor-pointer"
                        >
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                            {t("login.backHome")}
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
