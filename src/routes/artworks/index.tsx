import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import { getArtworks } from "#/api/fetchers";
import { createArtworkSlug } from "#/components/utlis";
import { GlobalLoader } from "#/components/GlobalLoader";
import { ProtectedImage } from "#/components/ui/ProtectedImage";
import { t } from "i18next";

export const Route = createFileRoute("/artworks/")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    loader: ({ context }) => getArtworks(context.lang.split("-")[0]),
    component: AuthorsTimeline,
    staticData: {
        title: "nav.artworks",
    },
});

function AuthorsTimeline() {
    const artworks = Route.useLoaderData();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);
    const navigate = useNavigate();

    const total = artworks.length;

    const timelineArtworks = useMemo(
        () => [...artworks].sort((a, b) => a.year - b.year),
        [artworks],
    );

    useEffect(() => {
        const mainElement = document.getElementById("main-content");
        if (mainElement) mainElement.style.padding = "0";
        return () => {
            if (mainElement) mainElement.style.padding = "";
        };
    }, []);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
            if (e.deltaY === 0) return;
            e.preventDefault();
            if (isScrolling.current) return;
            isScrolling.current = true;
            el.scrollBy({
                left: e.deltaY > 0 ? window.innerWidth : -window.innerWidth,
                behavior: "smooth",
            });
            setTimeout(() => {
                isScrolling.current = false;
            }, 650);
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return;
        scrollContainerRef.current.scrollBy({
            left: direction === "left" ? -window.innerWidth : window.innerWidth,
            behavior: "smooth",
        });
    };

    const { scrollXProgress } = useScroll({ container: scrollContainerRef });
    // Progress bar
    const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

    return (
        <motion.div className="relative h-screen w-screen overflow-hidden">
            <header className="absolute top-0 left-0 right-0 z-40 pt-32 flex flex-col items-center gap-2 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className="flex items-center gap-4"
                >
                    <div className="h-px w-10 bg-(--parisian-stone)/30" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-(--parisian-stone) font-sans">
                        {t("artwork.title")}
                    </span>
                    <div className="h-px w-10 bg-(--parisian-stone)/30" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="text-2xl md:text-4xl font-black text-(--deep-charcoal) font-serif italic tracking-tight"
                >
                    {t("artwork.pageTitle")}
                </motion.h1>
            </header>

            <div className="absolute bottom-0 left-0 right-0 z-50 h-[2px] bg-(--parisian-stone)/10">
                <motion.div
                    style={{ width: progressWidth }}
                    className="h-full bg-(--burnished-copper) rounded-full origin-left"
                />
            </div>

            <div className="absolute bottom-24 w-full z-50 flex items-center justify-between px-8">
                <motion.button
                    onClick={() => scroll("left")}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label="Scroll left"
                    className="w-11 h-11 left-16 rounded-full border border-(--parisian-stone)/30 bg-(--vintage-sepia-light)/60 backdrop-blur-md text-(--parisian-stone-dark) hover:text-(--deep-charcoal) hover:border-(--burnished-copper)/50 hover:bg-white/60 transition-all duration-300 flex items-center justify-center shadow-md"
                >
                    <ArrowLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                    onClick={() => scroll("right")}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label="Scroll right"
                    className="w-11 h-11 right-16 rounded-full border border-(--parisian-stone)/30 bg-(--vintage-sepia-light)/60 backdrop-blur-md text-(--parisian-stone-dark) hover:text-(--deep-charcoal) hover:border-(--burnished-copper)/50 hover:bg-white/60 transition-all duration-300 flex items-center justify-center shadow-md"
                >
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            </div>

            <section
                aria-label="Artistic Journey Timeline"
                ref={scrollContainerRef}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") scroll("left");
                    if (e.key === "ArrowRight") scroll("right");
                }}
                className="relative z-10 h-screen w-full flex items-center overflow-x-auto overflow-y-hidden no-scrollbar focus:outline-none snap-x snap-mandatory"
            >
                {timelineArtworks.map((artwork, index) => {
                    return (
                        <div
                            key={artwork.id}
                            className="shrink-0 w-screen h-full flex items-center snap-center relative"
                        >
                            <div className="absolute inset-0 flex items-center justify-start pl-[6vw] pointer-events-none select-none overflow-hidden">
                                <span
                                    className="text-[22vw] font-black font-mono tabular-nums tracking-tighter leading-none select-none"
                                    style={{
                                        color: "rgba(43,45,47,0.05)",
                                    }}
                                >
                                    {artwork.year}
                                </span>
                            </div>

                            <div className="relative z-10 w-full h-full flex items-center px-8 md:px-16 lg:px-[8vw] gap-10 lg:gap-16">
                                <motion.div
                                    initial={{ opacity: 0, x: -24 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{
                                        duration: 0.7,
                                        ease: "easeOut",
                                    }}
                                    className="hidden md:flex flex-col justify-center gap-6 w-[32%] lg:w-[28%] shrink-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-(--parisian-stone) tabular-nums">
                                            {String(index + 1).padStart(2, "0")}{" "}
                                            / {String(total).padStart(2, "0")}
                                        </span>
                                        <div className="h-px flex-1 bg-(--parisian-stone)/20" />
                                    </div>

                                    <span className="block text-7xl lg:text-8xl font-black font-mono tabbular-nums tracking-tighter leading-none text-(--burnished-copper)">
                                        {artwork.year}
                                    </span>
                                    <h3 className="space-y-2 text-2xl lg:text-3xl font-serif italic leading-tight text-(--deep-charcoal)">
                                        {artwork.historicalPeriod}
                                    </h3>
                                    {artwork.title && (
                                        <div className="space-y-1.5 pt-4 border-t border-(--parisian-stone)/15">
                                            <p className="text-sm font-medium text-(--parisian-stone-dark) leading-snug">
                                                {artwork.title}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>

                                {/* ── Right: photo card ── */}
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{
                                        duration: 0.9,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="flex-1 flex justify-center items-center h-full py-24"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.03, y: -5 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 22,
                                        }}
                                        className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-(--burnished-copper)/60 focus-visible:ring-offset-4 rounded-4xl"
                                        style={{
                                            width: "min(40vw, 460px)",
                                            aspectRatio: "3/4",
                                        }}
                                        onClick={() =>
                                            navigate({
                                                to: `/artworks/$id`,
                                                params: {
                                                    id: createArtworkSlug(
                                                        artwork.id,
                                                        artwork.title,
                                                    ),
                                                },
                                            })
                                        }
                                        aria-label={`View artwork: ${artwork.title} (${artwork.year})`}
                                    >
                                        {/* Copper glow on hover (colour era) / stone glow (B&W) */}
                                        <div
                                            className="absolute -inset-4 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
                                            style={{
                                                background:
                                                    "rgba(100,102,90,0.12)",
                                            }}
                                        />

                                        {/* Card frame — like a physical photo */}
                                        <div
                                            className="relative w-full h-full rounded-4xl overflow-hidden shadow-[0_24px_70px_rgba(43,45,47,0.18)] border"
                                            style={{
                                                borderColor:
                                                    "rgba(43,45,47,0.10)",
                                                background:
                                                    "var(--vintage-sepia-light)",
                                            }}
                                        >
                                            {/* Photo with grayscale transition */}
                                            <motion.div className="absolute inset-0">
                                                <ProtectedImage
                                                    src={artwork.imageUrl}
                                                    alt={
                                                        artwork.title ||
                                                        `${artwork.year}`
                                                    }
                                                    className="w-full h-full object-cover scale-[1.02] group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </motion.div>

                                            {/* Subtle warm vignette */}
                                            <div className="absolute inset-0 bg-linear-to-t from-(--deep-charcoal)/60 via-transparent to-transparent pointer-events-none z-10 opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

                                            {/* Hover caption */}
                                            <div className="absolute inset-0 z-20 flex flex-col justify-end p-7 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                                                {artwork.title && (
                                                    <p className="text-(--vintage-sepia) font-serif italic text-lg leading-snug drop-shadow-lg">
                                                        {artwork.title}
                                                    </p>
                                                )}
                                                <p className="text-(--vintage-sepia)/50 font-mono text-xs tracking-widest mt-1">
                                                    {artwork.year}
                                                </p>
                                                <div className="flex items-center gap-2 mt-4">
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-(--burnished-copper)">
                                                        View
                                                    </span>
                                                    <MoveRight className="w-3 h-3 text-(--burnished-copper) group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>

                                            {/* Glass sheen */}
                                            <div className="absolute inset-0 z-30 bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                                        </div>
                                    </motion.button>
                                </motion.div>

                                {/* ── Mobile label ── */}
                                <div className="md:hidden absolute bottom-16 left-6 right-6 z-20">
                                    <span
                                        className="block text-5xl font-black font-mono tabular-nums tracking-tighter mb-1"
                                        style={{
                                            color: "rgba(43,45,47,0.25)",
                                        }}
                                    >
                                        {artwork.year}
                                    </span>
                                    <h3 className="text-xl font-serif italic text-(--parisian-stone-dark)">
                                        {artwork.historicalPeriod}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </motion.div>
    );
}
