import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { authApi } from "#/components/auth";
import { useAuth } from "#/components/contexts/AuthContext";

export const Route = createFileRoute("/login/forgot-password")({
    component: ForgotPasswordPage,
    staticData: {
        title: "nav.forgotPassword",
    },
});

function ForgotPasswordPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const { setAuth } = useAuth();

    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [secondNewPassword, setSecondNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showSecondNewPassword, setShowSecondNewPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        if (oldPassword === newPassword) {
            setError("La vecchia password e la nuova password non possono essere uguali.");
            return;
        }
        if (newPassword !== secondNewPassword) {
            setError("La nuova password e la conferma della nuova password non coincidono.");
            return;
        }
        try {
            await authApi.changePassword({
                email,
                oldPassword,
                newPassword,
            });
            navigate({ to: "/" });
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
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full max-w-lg relative z-10"
            >

                <motion.div
                    layout
                    variants={itemFadeUp}
                    className="bg-white/40 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-white/60 shadow-2xl space-y-10 relative overflow-hidden"
                >
                    <div className="space-y-4">
                        <motion.h1
                            layout
                            className="text-5xl font-black text-(--deep-charcoal) font-serif italic tracking-tight"
                        >
                            {t("login.changePasswordTitle")}
                        </motion.h1>
                        <motion.p
                            layout
                            className="text-(--parisian-stone-dark) text-sm font-medium opacity-80 italic max-w-sm leading-relaxed"
                        >
                            {t("login.changePasswordSubtitle")}
                        </motion.p>
                    </div>

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

                            <motion.div layout className="space-y-2 group">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-(--parisian-stone) ml-2 transition-colors group-focus-within:text-(--burnished-copper)">
                                    {t("login.oldPassword")}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--parisian-stone) opacity-50" />
                                    <input
                                        type={showOldPassword ? "text" : "password"}
                                        required
                                        value={oldPassword}
                                        onChange={(e) =>
                                            setOldPassword(e.target.value)
                                        }
                                        className="w-full bg-white/40 border border-black/5 rounded-[1.25rem] py-4.5 pl-14 pr-14 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--burnished-copper)/30 focus:bg-white transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowOldPassword(!showOldPassword)
                                        }
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-(--parisian-stone) hover:text-(--deep-charcoal) transition-colors cursor-pointer"
                                        aria-label={
                                            showOldPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showOldPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div layout className="space-y-2 group">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-(--parisian-stone) ml-2 transition-colors group-focus-within:text-(--burnished-copper)">
                                    {t("login.newPassword")}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--parisian-stone) opacity-50" />
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        required
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        className="w-full bg-white/40 border border-black/5 rounded-[1.25rem] py-4.5 pl-14 pr-14 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--burnished-copper)/30 focus:bg-white transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNewPassword(!showNewPassword)
                                        }
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-(--parisian-stone) hover:text-(--deep-charcoal) transition-colors cursor-pointer"
                                        aria-label={
                                            showNewPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div layout className="space-y-2 group">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-(--parisian-stone) ml-2 transition-colors group-focus-within:text-(--burnished-copper)">
                                    {t("login.confirmNewPassword")}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--parisian-stone) opacity-50" />
                                    <input
                                        type={showSecondNewPassword ? "text" : "password"}
                                        required
                                        value={secondNewPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        className="w-full bg-white/40 border border-black/5 rounded-[1.25rem] py-4.5 pl-14 pr-14 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--burnished-copper)/30 focus:bg-white transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowSecondNewPassword(!showSecondNewPassword)
                                        }
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-(--parisian-stone) hover:text-(--deep-charcoal) transition-colors cursor-pointer"
                                        aria-label={
                                            showSecondNewPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showSecondNewPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div
                                layout
                                className="pt-10 border-t border-black/5 flex flex-col items-center gap-6"
                            >
                                <p className="text-sm font-medium text-(--parisian-stone-dark)">
                                    <button
                                        onClick={() => navigate({ to: "/login" })}
                                        className="text-(--burnished-copper) font-bold hover:underline cursor-pointer ml-1"
                                    >
                                        {t("login.backToLogin")}
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
                        </AnimatePresence>
                    </form>

                    <motion.div
                        layout
                        className="flex items-center justify-center space-x-2 pt-4 border-t border-white/20"
                    >
                        <span className="text-xs font-medium text-(--parisian-stone)">
                            {isLogin
                                ? t("login.noAccount")
                                : t("register.haveAccount")}
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-xs font-black uppercase tracking-[0.2em] text-(--burnished-copper) hover:text-(--deep-charcoal) transition-colors"
                        >
                            {isLogin ? t("login.signUp") : t("login.signIn")}
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}