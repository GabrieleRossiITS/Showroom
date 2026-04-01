import { GlobalLoader } from "#/components/GlobalLoader";
import Button from "#/components/ui/Button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Quote } from "public/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
    component: App,
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    staticData: {
        title: "Robert Doisneau",
        breadcrumb: "home",
    },
});

function App() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [quote, setQuote] = useState<string>('');

    useEffect(() => {
        fetch("http://localhost:3000/api/quotes.json")
            .then((res: Response) => res.json())
            .then((data: Quote[]) => {
                const randomIndex = Math.floor(Math.random() * data.length);

                setQuote(data[randomIndex].text);
            })
            .catch((error) => {
                console.error("Errore durante il recupero dei dati:", error);
            });
    }, []);

    return (
        <>
            <div className="relative top-[50%] translate-y-[50%] flex flex-col justify-center h-full max-w-7xl m-auto gap-24">
                <div className="flex flex-row gap-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-[50%] max-w-3xl"
                    >
                        <h1 className="text-7xl font-black text-(--deep-charcoal) mb-8 font-serif drop-shadow-sm leading-tight">
                            Robert Doisneau
                        </h1>
                        <p className="text-xl text-(--parisian-stone-dark) leading-relaxed mb-12">
                            {t("home.subtitle")}
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Button
                                onClick={() => {
                                    navigate({ to: "/artworks" });
                                }}
                                variant="primary"
                                rounded="full"
                                size="lg"
                                className="px-8 font-medium shadow-lg hover:shadow-xl"
                            >
                                {t("home.exploreArtworks")}
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate({ to: "/exhibitions" });
                                }}
                                variant="outline"
                                rounded="full"
                                size="lg"
                                className="px-8 font-medium"
                            >
                                {t("home.exhibitions")}
                            </Button>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-[50%] max-w-xl flex"
                    >
                        <p className="self-center text-2xl text-(--parisian-stone-dark) leading-relaxed font-serif italic opacity-90">
                            "{quote}"
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <div className="w-full h-px bg-(--line) mb-8" />
                    <div className="flex justify-between items-center text-(--parisian-stone-dark) text-sm font-mono tracking-widest uppercase">
                        <span>1912 - 1994</span>
                        <span>Paris, France</span>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
