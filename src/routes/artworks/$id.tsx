import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Info } from "lucide-react";
import Button from "#/components/ui/Button";
import { getArtworkById } from "public/api/fetchers";
import { useTranslation } from "react-i18next";
import { GlobalLoader } from "#/components/GlobalLoader";

export const Route = createFileRoute("/artworks/$id")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    loader: async ({ params }) => {
        const artworkId = parseInt(params.id.split("-")[0], 10);
        return getArtworkById(artworkId);
    },
    component: ArtworkDetail,
    staticData: {
        title: "Dettaglio Opera - Robert Doisneau",
    },
});

function ArtworkDetail() {
    const artwork = Route.useLoaderData();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
    };

    const imageTransition = {
        initial: { opacity: 0, scale: 0.9, rotate: -2 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1] as any,
        },
    };

    return (
        <div className="page-wrap z-10 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-between items-center mb-12 md:mb-16"
            >
                <Button
                    onClick={() => navigate({ to: "/artworks" })}
                    variant="ghost"
                    className="group gap-2 text-(--parisian-stone-dark) hover:text-(--deep-charcoal) bg-white/20 backdrop-blur-md border border-white/40 rounded-full px-6"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t("artworkDetail.backGallery")}
                </Button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center">
                <motion.div {...imageTransition} className="relative group">
                    <div className="absolute -inset-4 bg-(--burnished-copper)/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="relative z-10 p-4 md:p-6 bg-(--burnished-copper) rounded-[2.5rem] shadow-2xl shadow-(--deep-charcoal)/30 transform transition-transform duration-700 group-hover:scale-[1.02]">
                        <div className="relative bg-(--deep-charcoal) rounded-[1.8rem] overflow-hidden shadow-[inset_0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 aspect-4/5 md:aspect-auto">
                            <img
                                src={artwork.image}
                                alt={artwork.title}
                                className="w-full h-auto object-contain max-h-[75vh] mx-auto"
                            />
                            <div className="absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />
                        </div>

                        <div className="absolute inset-0 rounded-[2.5rem] border border-white/30 mix-blend-overlay pointer-events-none" />
                    </div>

                    <div className="hidden md:flex absolute -right-6 bottom-12 z-20 flex-col items-center bg-(--deep-charcoal) text-(--vintage-sepia) p-4 rounded-3xl shadow-xl border border-white/10 rotate-3">
                        <div className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-1">
                            {t("artworkDetail.archive")}
                        </div>
                        <div className="text-sm font-bold">
                            RD-{artwork.id.toString().padStart(4, "0")}
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-col">
                    <motion.div {...fadeIn}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper-deep) text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-(--burnished-copper)/20">
                            <Info className="w-3 h-3" />
                            {t("artworkDetail.originalWork")}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-(--deep-charcoal) mb-4 leading-[1.1] tracking-tight italic">
                            {artwork.title}
                        </h1>

                        <div className="flex items-baseline gap-4 mb-10">
                            <div className="h-px w-12 bg-(--burnished-copper)/40" />
                            <span className="text-3xl font-serif text-(--burnished-copper) font-medium italic">
                                {artwork.year}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-sm">
                            <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-(--parisian-stone) mb-4">
                                {t("artworkDetail.description")}
                            </h3>
                            <p className="text-(--parisian-stone-dark) leading-relaxed text-lg font-serif">
                                {artwork.description}
                            </p>
                        </div>

                        <div className="bg-(--vintage-sepia-light)/50 backdrop-blur-md p-6 rounded-4xl border border-(--line) hover:bg-white/40 transition-colors cursor-default">
                            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-(--parisian-stone) mb-2">
                                {t("artworkDetail.support")}
                            </h4>
                            <p className="font-serif text-(--deep-charcoal) text-lg font-medium">
                                {artwork.support}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
