import Button from "#/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock } from "lucide-react";
import { changePassword } from "#/api/fetchers";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SecurityTab({ email }: { email: string }) {
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
        "idle",
    );
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");
        try {
            await changePassword({ email, currentPassword, newPassword });
            setStatus("ok");
            setCurrentPassword("");
            setNewPassword("");
            setTimeout(() => setStatus("idle"), 4000);
        } catch (err: any) {
            setStatus("error");
            setErrorMsg(err.message || t("account.changePasswordError"));
        }
    };

    return (
        <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-sm p-8 md:p-12 space-y-8 max-w-lg">
            <h2 className="text-2xl font-bold font-serif text-(--deep-charcoal)">
                {t("account.passwordTab.changePassword")}
            </h2>

            <AnimatePresence>
                {status === "ok" && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-sm p-4 rounded-2xl"
                    >
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        {t("account.passwordTab.passwordChanged")}
                    </motion.div>
                )}
                {status === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-600 text-sm p-4 rounded-2xl"
                    >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {errorMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Current password */}
                <div className="space-y-2 group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-(--parisian-stone) ml-2 transition-colors group-focus-within:text-(--burnished-copper)">
                        {t("account.passwordTab.currentPassword")}
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--parisian-stone) opacity-50" />
                        <input
                            type={showCurrent ? "text" : "password"}
                            required
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-white/40 border border-black/5 rounded-[1.25rem] py-4 pl-14 pr-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--burnished-copper)/30 focus:bg-white transition-all"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-(--parisian-stone) hover:text-(--deep-charcoal) transition-colors cursor-pointer"
                        >
                            {showCurrent ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* New password */}
                <div className="space-y-2 group">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-(--parisian-stone) ml-2 transition-colors group-focus-within:text-(--burnished-copper)">
                        {t("account.passwordTab.newPassword")}
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--parisian-stone) opacity-50" />
                        <input
                            type={showNew ? "text" : "password"}
                            required
                            minLength={6}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-white/40 border border-black/5 rounded-[1.25rem] py-4 pl-14 pr-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--burnished-copper)/30 focus:bg-white transition-all"
                            placeholder="min. 6 caratteri"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-(--parisian-stone) hover:text-(--deep-charcoal) transition-colors cursor-pointer"
                        >
                            {showNew ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={status === "loading"}
                    variant="copper"
                    size="lg"
                    rounded="full"
                    className="w-full h-14 font-bold uppercase tracking-[0.2em]"
                >
                    {status === "loading"
                        ? t("common.loading")
                        : t("account.passwordTab.updatePassword")}
                </Button>
            </form>
        </div>
    );
}
