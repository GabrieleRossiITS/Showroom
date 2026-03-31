import { GlobalLoader } from "#/components/GlobalLoader";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const CherryPetals = () => {
    const [petals, setPetals] = useState<number[]>([]);

    useEffect(() => {
        setPetals(Array.from({ length: 30 }, (_, i) => i));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {petals.map((id) => (
                <motion.div
                    key={id}
                    className="absolute opacity-60 pointer-events-none"
                    style={{
                        backgroundColor: "#FFB7C5",
                        width: Math.random() * 12 + 6 + "px",
                        height: Math.random() * 12 + 6 + "px",
                        borderRadius: "100% 0 100% 100%",
                        top: -30,
                        left: Math.random() * 100 + "vw",
                    }}
                    animate={{
                        y: ["0vh", "105vh"],
                        x: [
                            "0vw",
                            `${Math.random() * 20 - 10}vw`,
                            `${Math.random() * 20 - 10}vw`,
                        ],
                        rotate: [0, Math.random() * 360, Math.random() * 720],
                    }}
                    transition={{
                        duration: Math.random() * 6 + 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </div>
    );
};

export const Route = createFileRoute("/about")({
    component: About,

    pendingComponent: GlobalLoader,
    pendingMs: 0,

    staticData: {
        title: "Contatti",
    },
});

function About() {
    const { t, i18n } = useTranslation();

    return (
        <>
            {i18n.language === "jp" && <CherryPetals />}
            <div className="fixed inset-0 pointer-events-none z-0 bg-(--vintage-sepia)" />

            <div className="relative z-10 flex flex-col px-6 md:px-12 pt-32 pb-16 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-(--deep-charcoal) mb-12 font-serif drop-shadow-sm">
                        {t("about.title")}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-2xl font-bold text-(--burnished-copper-deep) mb-6">
                                {t("about.info")}
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest mb-1">
                                        {t("about.schoolProject")}
                                    </p>
                                    <p className="text-xl text-(--deep-charcoal) font-medium">
                                        {t("about.schoolProjectValue")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest mb-1">
                                        {t("about.devTeam")}
                                    </p>
                                    <p className="text-xl text-(--deep-charcoal) font-medium">
                                        PyTech
                                        <div className="my-2 pl-4">
                                            <h3 className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest">
                                                {t("about.composedBy")}
                                            </h3>
                                            Gabriele Rossi, Navpreet Singh,
                                            Lorenzo Veneruzzo e Ruben Ranghiuc
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
