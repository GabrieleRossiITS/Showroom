import { GlobalLoader } from "#/components/GlobalLoader";
import Button from "#/components/ui/Button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Quote } from "../types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, Ticket, Clock, ArrowRight, Info } from "lucide-react";
import {
    getExhibitionById,
    getExhibitionTiers,
    getExhibitionTimeSlots,
} from "../api/fetchers";

export const Route = createFileRoute("/")({
    loader: async ({ context }) => {
        const lang = context.lang.split("-")[0];
        const exhibitionId = 1;

        const [exhibition, hours, tiers] = await Promise.all([
            getExhibitionById(exhibitionId, lang),
            getExhibitionTimeSlots(exhibitionId),
            getExhibitionTiers(lang),
        ]);

        return { exhibition, hours, tiers };
    },
    component: App,
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    staticData: {
        title: "nav.home",
        breadcrumb: "nav.home",
    },
});

function App() {
    const { t, i18n } = useTranslation();
    const { exhibition, hours, tiers } = Route.useLoaderData();
    const navigate = useNavigate();
    const [quote, setQuote] = useState<string>("");

    useEffect(() => {
        const mainElement = document.getElementById("main-content");

        if (mainElement) {
            mainElement.style.padding = "0";
        }

        return () => {
            if (mainElement) {
                mainElement.style.padding = "";
            }
        };
    }, []);

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

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemFadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const },
        },
    };

    const getDayName = (dayNum: number) => {
        return t(`common.days.${dayNum}`);
    };

    return (
        <main className="min-h-screen bg-background flex flex-col relative w-full overflow-x-hidden">
            {/* Immersive Hero Section */}
            <section className="relative w-full h-[90vh] md:h-[80vh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={exhibition.imageUrl}
                        alt={exhibition.name}
                        className="w-full h-full object-cover object-center filter grayscale"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-(--deep-charcoal) via-(--deep-charcoal)/60 to-transparent mix-blend-multiply" />
                    <div className="absolute inset-0 bg-linear-to-r from-(--deep-charcoal)/80 via-transparent to-transparent opacity-80" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row justify-between items-end gap-12">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col items-start max-w-3xl"
                    >
                        <motion.span
                            variants={itemFadeUp}
                            className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-(--vintage-sepia) text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-6 border border-white/20"
                        >
                            Pixel Voyage &bull;{" "}
                            {t("home.subtitles.agencySubtitle", "")}
                        </motion.span>

                        <motion.h1
                            variants={itemFadeUp}
                            className="text-7xl md:text-9xl font-black text-white mb-8 font-serif leading-[0.85] tracking-tighter"
                        >
                            {exhibition.name.split(" ").slice(0, -1).join(" ")}{" "}
                            <br />
                            <span className="text-(--burnished-copper) italic font-light drop-shadow-xl">
                                {exhibition.name.split(" ").slice(-1)}
                            </span>
                        </motion.h1>

                        <motion.div
                            variants={itemFadeUp}
                            className="flex flex-wrap gap-4 md:gap-6 mt-4"
                        >
                            <Button
                                onClick={() => {
                                    navigate({ to: "/exhibitions/$id", params: { id: "1" } });  // exhibitions/1
                                }}
                                variant="copper"
                                rounded="full"
                                size="lg"
                                className="px-8 md:px-10 py-6 text-lg font-bold shadow-[0_0_40px_rgba(196,132,100,0.4)] hover:shadow-[0_0_60px_rgba(196,132,100,0.6)] hover:-translate-y-1 transition-all gap-3 border-0 active:scale-95"
                            >
                                <Ticket className="w-6 h-6" />
                                {t("home.subtitles.bookTickets", "")}
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate({ to: "/exhibitions/$id", params: { id: "1" } });  // exhibitions/1
                                }}
                                variant="glass"
                                rounded="full"
                                size="lg"
                                className="px-8 md:px-10 py-6 text-lg font-bold hover:-translate-y-1 transition-all gap-3 active:scale-95"
                            >
                                <Info className="w-6 h-6" />
                                {t("home.subtitles.exhibitionInfo", "")}
                                <ArrowRight className="w-6 h-6" />
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="hidden lg:block w-full max-w-sm"
                    >
                        <div className="p-8 rounded-4xl bg-(--deep-charcoal)/40 backdrop-blur-2xl border border-white/10 relative">
                            <div className="text-(--burnished-copper) text-6xl font-serif leading-none opacity-40 absolute top-4 left-4">
                                "
                            </div>
                            <p className="relative z-10 text-xl text-white leading-relaxed font-serif italic pt-6">
                                {quote || exhibition.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Structured Information Grid */}
            <section className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 -mt-8 md:-mt-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 lg:grid-cols-4 bg-white shadow-2xl rounded-4xl overflow-hidden border border-(--line) divide-y lg:divide-y-0 lg:divide-x divide-(--line)"
                >
                    <div className="relative p-8 md:p-10 flex flex-col justify-start bg-(--vintage-sepia-light)/30 hover:bg-(--vintage-sepia-light)/80 transition-colors group">
                        <div className="absolute top-2 left-2 w-12 h-12 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper-deep) flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <h3 className="text-xs uppercase tracking-widest text-(--parisian-stone) font-bold mb-2 mt-6">
                            {t(`home.titles.${exhibition.status}`)}
                        </h3>
                        <p className="font-mono text-(--deep-charcoal) font-medium text-lg leading-tight">
                            {new Date(exhibition.startDate).toLocaleDateString(
                                i18n.language,
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                },
                            )}{" "}
                            -{" "}
                            {new Date(exhibition.endDate).toLocaleDateString(
                                i18n.language,
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                },
                            )}
                        </p>
                    </div>

                    <div className="relative p-8 md:p-10 flex flex-col justify-start bg-(--vintage-sepia-light)/30 hover:bg-(--vintage-sepia-light)/80 transition-colors group">
                        <div className="absolute top-2 left-2 w-12 h-12 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper-deep) flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <h3 className="text-xs uppercase tracking-widest text-(--parisian-stone) font-bold mb-2 mt-6">
                            {t("home.titles.location")}
                        </h3>
                        <a
                            href={exhibition.mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-(--deep-charcoal) font-medium text-sm leading-relaxed hover:text-(--burnished-copper) transition-colors"
                        >
                            {exhibition.location}
                        </a>
                    </div>

                    <div className="relative p-8 md:p-10 flex flex-col justify-start bg-(--vintage-sepia-light)/30 hover:bg-(--vintage-sepia-light)/80 transition-colors group">
                        <div className="absolute top-2 left-2 w-12 h-12 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper-deep) flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Clock className="w-5 h-5" />
                        </div>
                        <h3 className="text-xs uppercase tracking-widest text-(--parisian-stone) font-bold mb-4 mt-6">
                            {t("home.titles.hoursAndTours")}
                        </h3>
                        <ul className="font-mono text-sm text-(--deep-charcoal) space-y-2 mb-4">
                            {hours.map((h) => (
                                <li key={h.id} className="flex flex-col">
                                    <span className="opacity-60 text-[10px]">
                                        {h.daysOfWeek
                                            .map((d) =>
                                                getDayName(d).substring(0, 3),
                                            )
                                            .join(" - ")}
                                    </span>
                                    <span className="font-semibold">
                                        {h.startTime.substring(0, 5)} —{" "}
                                        {h.endTime.substring(0, 5)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* TARIFFE (TICKETS) */}
                    <div className="relative p-8 md:p-10 flex flex-col justify-start bg-(--vintage-sepia-light)/30 hover:bg-(--vintage-sepia-light)/80 transition-colors group">
                        <div className="absolute top-2 left-2 w-12 h-12 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper-deep) flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Ticket className="w-5 h-5" />
                        </div>
                        <h3 className="text-xs uppercase tracking-widest text-(--parisian-stone) font-bold mb-4 mt-6">
                            {t("home.titles.prices")}
                        </h3>
                        <div className="font-mono text-sm text-(--deep-charcoal) space-y-2 flex flex-col">
                            {tiers.map((tier) => (
                                <div
                                    key={tier.id}
                                    className="flex justify-between border-b border-(--line) pb-1"
                                >
                                    <span className="font-medium text-(--deep-charcoal)">
                                        {tier.name}
                                    </span>
                                    <span className="font-bold text-(--burnished-copper-deep)">
                                        {tier.price === 0
                                            ? ""
                                            : `${tier.price.toFixed(2)}€`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Navigation Banners */}
            <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => navigate({ to: "/artists" })}
                    className="p-10 md:p-12 rounded-[3rem] bg-(--deep-charcoal) text-white cursor-pointer group overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-linear-to-tr from-(--burnished-copper)/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase tracking-widest mb-6">
                                {t("home.titles.discoverArtist")}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                                {t("home.subtitles.exploreUniverse")}
                                <br />
                                <span className="italic font-light text-(--burnished-copper)">
                                    {t("home.subtitles.ofTheArtist")}
                                </span>
                            </h2>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-(--burnished-copper) group-hover:border-transparent transition-all overflow-hidden">
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    onClick={() => navigate({ to: "/exhibitions" })}
                    className="p-10 md:p-12 rounded-[3rem] border border-(--line) bg-white/50 backdrop-blur-sm cursor-pointer group overflow-hidden relative"
                >
                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper-deep) text-[10px] uppercase tracking-widest mb-6">
                                {t("home.titles.upcomingExhibitions")}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-(--deep-charcoal) leading-tight">
                                O. Arthur, <br />
                                <span className="opacity-40">S. Furuya, </span>
                                <br />
                                <span className="italic font-light text-(--burnished-copper)">
                                    S. Moshammer
                                </span>
                            </h2>
                        </div>
                        <div className="self-end w-14 h-14 rounded-full bg-(--deep-charcoal) border flex items-center justify-center group-hover:bg-(--burnished-copper) transition-colors text-white">
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}

export default App;

// TODO: add a section with the artist's biography
// TODO: fetch data of the exhibition for the tickets
