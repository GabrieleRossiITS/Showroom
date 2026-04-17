import {
    createFileRoute,
    useNavigate,
    useLocation,
} from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    ArrowRight,
    PackageCheck,
    ScrollText,
    Receipt,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Button from "#/components/ui/Button";
import type { Cart } from "#/types";

export const Route = createFileRoute("/order-success")({
    component: OrderSuccessPage,
    staticData: {
        title: "nav.success",
    },
});

function OrderSuccessPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const locationState = location.state as
        | undefined
        | { cartData?: Cart; totalAmount?: number };
    const cartData = locationState?.cartData;
    const totalAmount = locationState?.totalAmount || 0;

    const [showRecap, setShowRecap] = useState(false);

    useEffect(() => {
        if (cartData) {
            const timer = setTimeout(() => {
                setShowRecap(true);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [cartData]);

    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } },
    };

    const itemVariants = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const actionsUi = (
        <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
            <Button
                variant="copper"
                rounded="full"
                size="lg"
                onClick={() => navigate({ to: "/account" })}
                className="group h-16 min-w-[200px]"
            >
                <ScrollText className="w-5 h-5 mr-2 opacity-70" />
                {t("success.viewOrders", "I Miei Ordini")}
            </Button>
            <Button
                variant="ghost"
                rounded="full"
                size="lg"
                onClick={() => navigate({ to: "/shop" })}
                className="bg-black/10 hover:bg-black/20 text-(--deep-charcoal) font-bold h-16 min-w-[200px]"
            >
                {t("success.continue", "Continua lo Shopping")}
                <ArrowRight className="w-5 h-5 ml-2 opacity-70" />
            </Button>
        </motion.div>
    );

    return (
        <div className="bg-(--vintage-sepia) flex items-center justify-center py-24 px-6 relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!showRecap ? (
                    <motion.div
                        key="success-message"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="max-w-xl w-full text-center space-y-12 z-10"
                    >
                        {/* ── Success Icon ── */}
                        <motion.div
                            variants={itemVariants}
                            className="relative inline-block"
                        >
                            <div className="absolute inset-0 bg-(--burnished-copper)/20 blur-3xl rounded-full scale-150 animate-pulse" />
                            <div className="relative w-32 h-32 rounded-[2.5rem] bg-(--deep-charcoal) flex items-center justify-center text-(--burnished-copper) shadow-2xl">
                                <PackageCheck className="w-14 h-14" />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg border-4 border-(--vintage-sepia)"
                                >
                                    <Sparkles className="w-6 h-6" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* ── Text Content ── */}
                        <div className="space-y-6">
                            <motion.h1
                                variants={itemVariants}
                                className="text-5xl md:text-7xl font-serif font-bold italic text-(--deep-charcoal) tracking-tight leading-none"
                            >
                                {t("success.title", "Grazie per l'ordine!")}
                            </motion.h1>
                            <motion.p
                                variants={itemVariants}
                                className="text-xl text-(--parisian-stone-dark) font-serif opacity-70 leading-relaxed italic"
                            >
                                {t(
                                    "success.subtitle",
                                    "La tua richiesta è in fase di elaborazione. Riceverai una mail di conferma a breve con i dettagli della spedizione.",
                                )}
                            </motion.p>
                        </div>

                        {!cartData && actionsUi}
                    </motion.div>
                ) : (
                    <motion.div
                        key="recap-message"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl w-full z-10 space-y-8"
                    >
                        <div className="text-center space-y-4 mb-8">
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper) flex flex-col justify-center items-center shadow-inner">
                                    <Receipt className="w-8 h-8" />
                                </div>
                            </div>
                            <h2 className="text-4xl font-serif font-bold text-(--deep-charcoal)">
                                {t("success.recapTitle", "Riepilogo Ordine")}
                            </h2>
                            <p className="text-(--parisian-stone-dark) font-medium opacity-80">
                                {t(
                                    "success.recapSubtitle",
                                    "Ecco un riepilogo di ciò che hai appena acquistato.",
                                )}
                            </p>
                        </div>

                        <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50 space-y-6">
                            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-(--parisian-stone) border-b border-black/10 pb-4">
                                {t("success.recapItems", "Articoli Acquistati")}
                            </h3>
                            <div className="space-y-6">
                                {cartData?.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 items-center"
                                    >
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black/5 flex-shrink-0">
                                            {item.souvenirImageUrl ? (
                                                <img
                                                    src={item.souvenirImageUrl}
                                                    alt={item.souvenirName}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-black/20">
                                                    <PackageCheck className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-(--deep-charcoal) truncate">
                                                {item.souvenirName}
                                            </p>
                                            <p className="text-xs text-(--parisian-stone-dark) uppercase font-mono">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold font-mono text-(--burnished-copper)">
                                                {(
                                                    item.souvenirPrice *
                                                    item.quantity
                                                ).toFixed(2)}
                                                €
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-black/10 mt-6 pt-6">
                                <div className="flex justify-between items-end">
                                    <span className="font-mono text-sm tracking-widest uppercase opacity-50">
                                        {t(
                                            "success.recapTotal",
                                            "Totale Pagato",
                                        )}
                                    </span>
                                    <span className="text-4xl font-black font-mono text-(--deep-charcoal)">
                                        {totalAmount.toFixed(2)}€
                                    </span>
                                </div>
                            </div>
                        </div>

                        {actionsUi}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
