import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionTemplate,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "#/components/ui/Button";
import { getArtworks } from "public/api/fetchers";
import { createArtworkSlug } from "#/components/utlis";
import { GlobalLoader } from "#/components/GlobalLoader";
import { ProtectedImage } from "#/components/ui/ProtectedImage";

export const Route = createFileRoute("/artworks/")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    loader: ({ context }) => getArtworks(context.lang),
    component: AuthorsTimeline,
    staticData: {
        title: "Robert Doisneau - Timeline",
    },
});


const timelineEvents = [
    {
        year: "1932",
        title: "Primi Reportage",
        description:
            "Vende i suoi primi scatti documentalistici. L'inizio dell'esplorazione del paesaggio umano e urbano di Parigi.",
        isColor: false,
    },
    {
        year: "1934",
        title: "Geometrie Industriali",
        description:
            "Lavorando per Renault, affina la sua tecnica: impara a gestire la luce industriale e la precisione formale che influenzeranno i suoi lavori futuri.",
        isColor: false,
    },
    {
        year: "1945",
        title: "Il Flâneur Visivo",
        description:
            "Dopo la guerra, Doisneau vaga per le strade di Parigi catturando la vita quotidiana, sviluppando l'essenza della 'fotografia umanista'.",
        isColor: false,
    },
    {
        year: "1949",
        title: "Il Contrasto di Vogue",
        description:
            "Firma un contratto con Vogue: porta l'alta moda agli scenari urbani, inserendo dive nei mercati popolari creando un'estetica rivoluzionaria.",
        isColor: false,
    },
    {
        year: "1950",
        title: "L'Amore in Scena",
        description:
            "Scatta 'Le Baiser de l'hôtel de ville'. Un capolavoro che perfeziona la sua abilità nel sfumare il limite tra genuina spontaneità e sapiente regia teatrale.",
        isColor: false,
    },
    {
        year: "1960",
        title: "L'Anima degli Artisti",
        description:
            "Si concentra sui ritratti: da Picasso a Giacometti. Non si limita al volto ma immortala gli artisti immersi nel loro caotico ambiente creativo.",
        isColor: true,
    },
    {
        year: "1970",
        title: "Banlieue in Mutamento",
        description:
            "Ritorna ai sobborghi, le 'Banlieue', documentando i radicali cambiamenti architettonici e sociali di un mondo popolare che sta lentamente scomparendo.",
        isColor: true,
    },
    {
        year: "1980",
        title: "Maestro del '900",
        description:
            "Da fotografo errante a maestro indiscusso. Le sue mostre retrospettive in tutto il mondo canonizzano il suo stile e la sua eredità artistica parigina.",
        isColor: true,
    },
];

function AuthorsTimeline() {
    const artworks = Route.useLoaderData();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);
    const navigate = useNavigate();

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
        const el = scrollContainerRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
            if (e.deltaY === 0) return;
            e.preventDefault();

            if (isScrolling.current) return;
            isScrolling.current = true;

            const scrollAmount = window.innerWidth;
            if (e.deltaY > 0) {
                el.scrollBy({ left: scrollAmount, behavior: "smooth" });
            } else {
                el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            }

            setTimeout(() => {
                isScrolling.current = false;
            }, 600);
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = window.innerWidth;
        scrollContainerRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const { scrollXProgress } = useScroll({ container: scrollContainerRef });

    const colorIndex = timelineEvents.findIndex((e) => e.isColor);
    const totalEvents = timelineEvents.length;
    const transitionStart = Math.max(0, colorIndex - 1.5) / (totalEvents - 1);
    const transitionEnd = colorIndex / (totalEvents - 1);

    const grayscaleValue = useTransform(
        scrollXProgress,
        [0, transitionStart, transitionEnd, 1],
        [1, 1, 0, 0],
    );

    const filterTemplate = useMotionTemplate`grayscale(${grayscaleValue})`;

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-(--deep-charcoal)">
            <motion.div
                style={{ filter: filterTemplate }}
                className="absolute inset-0 pointer-events-none z-0 transition-opacity"
            >
                <motion.div
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -40, 60, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-[-15%] left-[-10%] w-[130vw] h-[80vh] bg-(--burnished-copper-deep)/60 rounded-[40%_60%_70%_30%/40%_40%_60%_50%] blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -60, 40, 0],
                        y: [0, 30, -20, 0],
                        scale: [1, 1.1, 0.95, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-[-20%] left-[20vw] w-[140vw] h-[90vh] bg-(--burnished-copper)/50 rounded-[30%_70%_50%_50%/50%_30%_70%_50%] blur-[150px] mix-blend-overlay"
                />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-[20%] right-[-10%] w-[80vw] h-[80vh] bg-(--parisian-stone)/40 rounded-[50%_50%_30%_70%/60%_40%_60%_40%] blur-[180px]"
                />
                <div className="absolute inset-0 bg-linear-to-b from-(--deep-charcoal)/30 via-(--deep-charcoal)/60 to-(--deep-charcoal)/90" />
            </motion.div>

            <div className="absolute inset-0 pointer-events-none z-50 p-8 pb-12 md:p-12 md:pb-16 flex flex-col justify-end">
                <div className="flex justify-between items-end mb-8 w-full">
                    <Button
                        onClick={() => scroll("left")}
                        variant="ghost"
                        size="icon"
                        rounded="full"
                        aria-label="Scroll left"
                        className="w-16 h-16 bg-(--parisian-stone)/10 hover:bg-(--parisian-stone)/30 border border-(--parisian-stone)/20 backdrop-blur-md text-(--vintage-sepia) pointer-events-auto shadow-xl"
                    >
                        <ArrowLeft className="w-8 h-8" aria-hidden="true" />
                    </Button>
                    <Button
                        onClick={() => scroll("right")}
                        variant="ghost"
                        size="icon"
                        rounded="full"
                        aria-label="Scroll right"
                        className="w-16 h-16 bg-(--parisian-stone)/10 hover:bg-(--parisian-stone)/30 border border-(--parisian-stone)/20 backdrop-blur-md text-(--vintage-sepia) pointer-events-auto shadow-xl"
                    >
                        <ArrowRight className="w-8 h-8" aria-hidden="true" />
                    </Button>
                </div>
            </div>

            <header className="absolute top-48 left-0 right-0 z-40 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-black text-white/50 font-serif drop-shadow-xl inline-block px-12 py-4"
                >
                    Il Viaggio Artistico
                </motion.h1>
            </header>

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
                <div
                    className="absolute top-1/2 left-0 h-[2px] bg-linear-to-r from-transparent via-(--burnished-copper)/40 to-transparent pointer-events-none"
                    style={{ width: `${timelineEvents.length * 100}vw` }}
                />

                {timelineEvents.map((event, index) => {
                    const isEven = index % 2 === 0;
                    const photo = artworks[index % artworks.length];

                    return (
                        <div
                            key={event.year}
                            className="shrink-0 w-screen h-full flex flex-col justify-center relative px-6 md:px-[12vw] snap-center"
                        >
                            <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-(--burnished-copper) rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(184,115,51,0.8)] z-20 border-4 border-(--deep-charcoal)" />

                            <div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-30 pointer-events-none"
                                style={{ marginTop: isEven ? "-80px" : "40px" }}
                            >
                                <h2 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-b from-(--burnished-copper) to-(--vintage-sepia) font-mono tabular-nums tracking-tighter opacity-80 drop-shadow-2xl">
                                    {event.year}
                                </h2>
                            </div>

                            <div
                                className={`w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10 ${isEven ? "" : "md:flex-row-reverse"}`}
                            >
                                <div
                                    className={`w-full md:w-1/2 text-center ${isEven ? "md:text-left" : "md:text-right"} bg-(--deep-charcoal)/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0 rounded-3xl md:rounded-none`}
                                >
                                    <h3 className="text-3xl lg:text-5xl font-serif text-(--parisian-stone) mb-6 drop-shadow-md">
                                        {event.title}
                                    </h3>
                                    <p className="text-(--vintage-sepia-light)/90 text-lg lg:text-xl leading-relaxed font-light">
                                        {event.description}
                                    </p>
                                </div>

                                <div className="w-full md:w-[45%] lg:w-[35%] flex justify-center">
                                    <button
                                        className="w-full max-w-[400px] relative p-2 md:p-3 bg-linear-to-br from-(--burnished-copper)/30 to-transparent rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden aspect-4/5 md:hover:scale-[1.03] transition-transform duration-500 group text-left block focus:outline-none focus:ring-4 focus:ring-(--burnished-copper)/50"
                                        onClick={() => {
                                            navigate({
                                                to: `/artworks/$id`,
                                                params: {
                                                    id: createArtworkSlug(
                                                        photo.id,
                                                        photo.title,
                                                    ),
                                                },
                                            });
                                        }}
                                        aria-label={`View artwork relating to ${event.year}`}
                                    >
                                        <div className="w-full h-full rounded-4xl md:rounded-[3rem] bg-(--deep-charcoal) relative overflow-hidden border border-(--inset-glint)/20">
                                            <div className="absolute inset-0 bg-linear-to-t from-(--deep-charcoal)/90 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-20 transition-opacity duration-500" />
                                            <ProtectedImage
                                                src={photo.imageUrl}
                                                alt={photo.title || `Event ${event.year}`}
                                                className={`w-full h-full object-cover transition-all duration-700 pointer-events-none ${
                                                    event.isColor
                                                        ? "saturate-100 group-hover:saturate-150"
                                                        : "filter grayscale sepia-[0.3] group-hover:grayscale-0 group-hover:sepia-0"
                                                }`}
                                            />
                                            {photo.title && (
                                                <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                    <p className="text-(--parisian-stone) font-serif italic text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                        {photo.title} (
                                                        {photo.year})
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </button>
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
        </div>
    );
}
