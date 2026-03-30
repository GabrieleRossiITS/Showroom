import { GlobalLoader } from "#/components/GlobalLoader";
import Button from "#/components/ui/Button";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
    component: App,
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    staticData: {
        title: "Robert Doisneau",
    },
});

function App() {
    const { t } = useTranslation();
    return (
        <>
            <div className="flex flex-col h-full max-w-7xl m-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
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
                                window.location.href = "/artworks";
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
                                window.location.href = "/expositions";
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-16"
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
