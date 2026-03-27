import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/about")({
    component: About,
    staticData: {
        title: "Contatti",
    },
});

function About() {
    const { t } = useTranslation();

    return (
        <>
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
                                        Femboys
                                        <div className="my-2 pl-4">
                                            <h3 className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest">
                                                {t("about.composedBy")}
                                            </h3>
                                            Gabriele Rossi, Navpreet Singh,
                                            Lorenzo Veneruzzo e Ruben Ranchiuc
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
