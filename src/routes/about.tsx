import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
    component: About,
    staticData: {
        title: "Contatti",
    },
});

function About() {
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
                        Le menti dietro al progetto
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-2xl font-bold text-(--burnished-copper-deep) mb-6">
                                Informazioni
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest mb-1">
                                        Progetto Scolastico
                                    </p>
                                    <p className="text-xl text-(--deep-charcoal) font-medium">
                                        Mostra su Robert Doisneau
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest mb-1">
                                        Team di Sviluppo
                                    </p>
                                    <p className="text-xl text-(--deep-charcoal) font-medium">
                                        Femoboys
                                        <div className="my-2 pl-4">
                                            <h5 className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest">
                                                Composto da:
                                            </h5>
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
