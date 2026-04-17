import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Button from "#/components/ui/Button";
import { MoveLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GlobalLoader } from "#/components/GlobalLoader";
import { useEffect, useState } from "react";
import type { Quote } from "#/types";
import { getMediaPreviews } from "#/api/fetchers";

export const Route = createFileRoute("/artists")({
    loader: async () => {
        const mediaPreviews = await getMediaPreviews();
        return { mediaPreviews };
    },
    component: Artists,
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    staticData: {
        title: "nav.artist",
        breadcrumb: "nav.artist",
    },
});

interface Artist {
    id: string;
    firstName: string;
    lastName: string;
    tag: string;
    life: string;
    nationality: string;
    movement: string;
    famousWork: string;
    activity: string;
    style: string;
    subject: string;
    originsTitle: string;
    originsP1: string;
    originsP2?: string;
    keyProjectTitle: string;
    keyProjectP1: string;
    keyProjectP2?: string;
    philosophyTitle: string;
    philosophyDesc: string;
    iconTitle: string;
    iconDesc: string;
    iconDate: string;
    legacyTitle: string;
    legacyP1: string;
    legacyP2?: string;
}

function Artists() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const artistsData = t("artists.data", { returnObjects: true }) as Artist[];

    const { mediaPreviews } = Route.useLoaderData();

    const [quote, setQuote] = useState<string>("");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8 },
    };

    useEffect(() => {
        fetch("/data/quotes.json")
            .then((res: Response) => res.json())
            .then((data: Quote[]) => {
                if (data.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    setQuote(data[randomIndex].text);
                }
            })
    }, []);

    return (
        <main className="page-wrap px-6 md:px-12 relative pb-32 overflow-x-hidden">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-(--burnished-copper)/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-(--parisian-stone)/5 blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto pt-24">
                <div className="mb-16">
                    <Button
                        onClick={() => navigate({ to: "/" })}
                        variant="ghost"
                        size="sm"
                        rounded="full"
                        className="gap-2 text-(--parisian-stone-dark) hover:text-(--deep-charcoal) transition-transform hover:-translate-x-1"
                    >
                        <MoveLeft className="w-4 h-4" />
                        {t("artists.titles.backHome")}
                    </Button>
                </div>

                <div className="space-y-10">
                    {artistsData.map((artist, index) => (
                        <div
                            key={artist.id}
                            className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-24 items-start pb-10 border-b border-b-red-(--deep-charcoal)"
                        >
                            <div className="lg:sticky lg:top-32 space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="relative aspect-square w-full rounded-[3rem] overflow-hidden bg-(--vintage-sepia-light)/40 backdrop-blur-3xl border border-(--line) shadow-xl flex flex-col items-center justify-center text-center"
                                >
                                    <img
                                        src={`${API_BASE_URL.replace("/api", "")}${mediaPreviews[artist.firstName + "_" + artist.lastName]}`}
                                        alt={`${artist.firstName} ${artist.lastName}`}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                <motion.div
                                    {...fadeIn}
                                    className="p-8 rounded-[2.5rem] bg-(--deep-charcoal) text-(--vintage-sepia) shadow-lg"
                                >
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] mb-4 opacity-50">
                                        {t("artists.titles.bioSummary")}
                                    </h4>
                                    <div className="space-y-3 text-xs">
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="opacity-50">
                                                {t("artists.titles.period")}
                                            </span>
                                            <span>{artist.life}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="opacity-50">
                                                {t("artists.titles.origin")}
                                            </span>
                                            <span>{artist.nationality}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-50">
                                                {t("artists.titles.work")}
                                            </span>
                                            <span className="text-right italic">
                                                {artist.famousWork}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    {...fadeIn}
                                    className="p-8 rounded-[2.5rem] bg-white/50 backdrop-blur-md border border-(--line)"
                                >
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] mb-4 text-(--deep-charcoal)/50">
                                        {t("artists.titles.techDetails")}
                                    </h4>
                                    <div className="space-y-3 text-xs text-(--deep-charcoal)">
                                        <div className="flex justify-between border-b border-(--line) pb-2">
                                            <span>
                                                {t("artists.titles.mood")}
                                            </span>
                                            <span className="font-bold text-right">
                                                {artist.style}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>
                                                {t("artists.titles.subjects")}
                                            </span>
                                            <span className="font-bold text-right">
                                                {artist.subject}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                {(artist.firstName == "Robert" && artist.lastName == "Doisneau") && (
                                    <motion.div {...fadeIn}>
                                        <Button
                                            onClick={() => {
                                                navigate({ to: "/artworks" });
                                            }}
                                            variant="copper"
                                            rounded="full"
                                            size="lg"
                                            className="w-full px-8 md:px-10 py-6 text-lg font-bold shadow-[0_0_40px_rgba(196,132,100,0.4)] hover:shadow-[0_0_60px_rgba(196,132,100,0.6)] hover:-translate-y-1 transition-all gap-3 border-0 active:scale-95"
                                        >
                                            {t("artists.titles.goToArtworks")}
                                        </Button>
                                    </motion.div>
                                )}
                            </div>

                            <div className="space-y-12">
                                <motion.section
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="bg-(--vintage-sepia-light)/60 backdrop-blur-xl p-10 md:p-16 rounded-[4rem] border border-(--line)"
                                >
                                    <span className="inline-block px-3 py-1 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper-deep) text-[10px] font-bold uppercase tracking-widest mb-6">
                                        {artist.tag}
                                    </span>
                                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-(--deep-charcoal) mb-8 leading-[0.9]">
                                        {artist.firstName} <br />
                                        <span className="text-(--burnished-copper)">
                                            {artist.lastName}
                                        </span>
                                    </h1>
                                    {index === 0 && quote && (
                                        <p className="text-xl md:text-2xl text-(--parisian-stone-dark) font-serif italic border-l-2 border-(--burnished-copper) pl-6 py-2">
                                            "{quote}"
                                        </p>
                                    )}
                                </motion.section>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div
                                        {...fadeIn}
                                        className="p-10 rounded-[3rem] bg-white/40 border border-(--line)"
                                    >
                                        <h2 className="text-xl font-serif font-bold text-(--deep-charcoal) mb-4 flex items-center gap-3">
                                            <span className="text-(--burnished-copper) opacity-30 italic">
                                                01.
                                            </span>{" "}
                                            {artist.originsTitle}
                                        </h2>
                                        <p className="text-(--parisian-stone-dark) leading-relaxed text-sm">
                                            {artist.originsP1}
                                        </p>
                                    </motion.div>
                                    <motion.div
                                        {...fadeIn}
                                        className="p-10 rounded-[3rem] bg-white/40 border border-(--line)"
                                    >
                                        <h2 className="text-xl font-serif font-bold text-(--deep-charcoal) mb-4 flex items-center gap-3">
                                            <span className="text-(--burnished-copper) opacity-30 italic">
                                                02.
                                            </span>{" "}
                                            {artist.keyProjectTitle}
                                        </h2>
                                        <p className="text-(--parisian-stone-dark) leading-relaxed text-sm">
                                            {artist.keyProjectP1}
                                        </p>
                                    </motion.div>
                                </div>

                                <motion.div
                                    {...fadeIn}
                                    className="relative overflow-hidden rounded-[3.5rem] bg-(--deep-charcoal) p-12 md:p-16 text-(--vintage-sepia)"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-(--burnished-copper)/20 blur-3xl rounded-full" />
                                    <h2 className="text-3xl font-serif font-bold mb-6 italic">
                                        {artist.philosophyTitle}
                                    </h2>
                                    <p className="text-lg opacity-80 leading-relaxed max-w-2xl">
                                        {artist.philosophyDesc}
                                    </p>
                                    <div className="mt-12 flex items-center gap-4">
                                        <div className="h-px w-12 bg-(--burnished-copper)" />
                                        <span className="text-xs font-mono uppercase tracking-widest text-(--burnished-copper)">
                                            {artist.iconDate}
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    {...fadeIn}
                                    className="p-10 md:p-14 bg-white/20 backdrop-blur-sm border border-white/40 rounded-[3.5rem]"
                                >
                                    <h2 className="text-2xl font-serif font-bold text-(--deep-charcoal) mb-6">
                                        {artist.legacyTitle}
                                    </h2>
                                    <p className="text-(--parisian-stone-dark) text-sm leading-relaxed">
                                        {artist.legacyP1}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Artists;
