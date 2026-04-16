import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
    Sparkles,
    ArrowRight,
    PackageCheck,
    ScrollText,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "#/components/ui/Button";

export const Route = createFileRoute("/order-success")({
    component: OrderSuccessPage,
    staticData: {
        title: "nav.success",
    },
});

function OrderSuccessPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div className="bg-(--vintage-sepia) flex items-center justify-center pt-24 pb-12 px-6">
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="max-w-xl w-full text-center space-y-12"
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

                {/* ── Actions ── */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
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
                        className="bg-white/30 backdrop-blur-md border border-white/60 h-16 min-w-[200px] hover:bg-white/50"
                    >
                        {t("success.continue", "Continua lo Shopping")}
                        <ArrowRight className="w-5 h-5 ml-2 opacity-70" />
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
