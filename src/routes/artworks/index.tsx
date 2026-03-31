import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "#/components/ui/Button";
import { getArtworks } from "public/api/fetchers";
import { createArtworkSlug } from "#/components/utlis";
import { GlobalLoader } from "#/components/GlobalLoader";

export const Route = createFileRoute("/artworks/")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    loader: () => getArtworks(),
    component: ArtworkGallery,
    staticData: {
        title: "Robert Doisneau - Opere",
    },
});

function ArtworkGallery() {
    const artworks = Route.useLoaderData();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
            if (e.deltaY === 0) return;
            e.preventDefault();
            el.scrollLeft += e.deltaY * 1.2;
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = window.innerWidth * 0.4;
        scrollContainerRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0 bg-(--deep-charcoal) overflow-hidden">

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
                    className="absolute top-[-15%] left-[-10%] w-[130vw] h-[80vh] bg-(--burnished-copper-deep)/80 rounded-[40%_60%_70%_30%/40%_40%_60%_50%] blur-[120px]"
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
                    className="absolute bottom-[-20%] left-[20vw] w-[140vw] h-[90vh] bg-(--burnished-copper)/60 rounded-[30%_70%_50%_50%/50%_30%_70%_50%] blur-[150px] mix-blend-overlay"
                />

                <motion.div
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-[20%] right-[-10%] w-[80vw] h-[80vh] bg-(--parisian-stone)/50 rounded-[50%_50%_30%_70%/60%_40%_60%_40%] blur-[180px]"
                />

                <motion.div
                    animate={{
                        y: [0, 100, 0],
                        x: [0, -50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-[10%] left-[40vw] w-[40vw] h-[40vh] bg-(--burnished-copper)/45 rounded-full blur-[100px] mix-blend-screen"
                />

                <div className="absolute inset-0 bg-linear-to-b from-transparent via-(--deep-charcoal)/20 to-(--deep-charcoal)/40" />
            </div>

            <div className="absolute inset-0 pointer-events-none z-50 p-12 flex flex-col justify-between">
                <div className="flex justify-between items-end h-full pb-10">
                    <Button
                        onClick={() => scroll("left")}
                        variant="ghost"
                        size="icon"
                        rounded="full"
                        aria-label="Scroll left"
                        className="w-14 h-14 bg-(--parisian-stone)/10 hover:bg-(--parisian-stone)/30 border border-(--parisian-stone)/20 backdrop-blur-md text-(--vintage-sepia) pointer-events-auto"
                    >
                        <ArrowLeft className="w-6 h-6" aria-hidden="true" />
                    </Button>
                    <Button
                        onClick={() => scroll("right")}
                        variant="ghost"
                        size="icon"
                        rounded="full"
                        aria-label="Scroll right"
                        className="w-14 h-14 bg-(--parisian-stone)/10 hover:bg-(--parisian-stone)/30 border border-(--parisian-stone)/20 backdrop-blur-md text-(--vintage-sepia) pointer-events-auto"
                    >
                        <ArrowRight className="w-6 h-6" aria-hidden="true" />
                    </Button>
                </div>
            </div>

            <section
                aria-label="Artwork Gallery"
                ref={scrollContainerRef}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") scroll("left");
                    if (e.key === "ArrowRight") scroll("right");
                }}
                className="relative z-10 h-[85vh] flex items-center overflow-x-auto overflow-y-hidden no-scrollbar gap-20 px-24 focus:outline-none"
            >
                {artworks.map((art, index) => {
                    const borderColor = "bg-(--burnished-copper)";
                    const shadowColor = "shadow-(--burnished-copper)/50";
                    const heightClasses = [
                        "h-[35vh]",
                        "h-[65vh]",
                        "h-[45vh]",
                        "h-[55vh]",
                        "h-[30vh]",
                        "h-[75vh]",
                    ];
                    const hClass = heightClasses[index % heightClasses.length];

                    const alignClasses = [
                        "self-start mt-12",
                        "self-end mb-12",
                        "self-center",
                        "self-start mt-24",
                        "self-end mb-24",
                    ];
                    const alignClass =
                        alignClasses[index % alignClasses.length];

                    const aspectClasses = [
                        "aspect-square",
                        "aspect-[4/5]",
                        "aspect-[3/2]",
                        "aspect-[2/3]",
                        "aspect-video",
                    ];
                    const aspectClass =
                        aspectClasses[index % aspectClasses.length];

                    return (
                        <motion.button
                            key={art.id}
                            aria-label={`${art.title}, ${art.year}`}
                            className={`shrink-0 ${hClass} ${aspectClass} ${alignClass} transition-transform hover:scale-[1.05] duration-500 cursor-pointer group text-left`}
                            onClick={() => {
                                navigate({
                                    to: `/artworks/$id`,
                                    params: {
                                        id: createArtworkSlug(
                                            art.id,
                                            art.title,
                                        ),
                                    },
                                });
                            }}
                        >
                            <div
                                className={`w-full h-full rounded-[3.5rem] p-3 ${borderColor} shadow-2xl ${shadowColor} relative overflow-hidden flex items-center justify-center`}
                            >
                                <div className="w-full h-full rounded-[2.8rem] bg-(--deep-charcoal) overflow-hidden relative shadow-[inset_0_20px_40px_rgba(0,0,0,0.8)] border border-(--line)">
                                    <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-[2s] ease-out">
                                        <img
                                            src={art.image}
                                            alt={art.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="absolute inset-0 bg-linear-to-t from-(--deep-charcoal)/90 via-(--deep-charcoal)/10 to-transparent pointer-events-none" />

                                    <div className="absolute bottom-10 left-8 right-8 pointer-events-none translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                        <p className="text-(--vintage-sepia-light) font-bold text-2xl leading-tight mb-2 drop-shadow-md">
                                            {art.title}
                                        </p>
                                        <p className="text-(--burnished-copper) font-mono tracking-widest text-sm drop-shadow-md">
                                            {art.year}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 rounded-[3.5rem] border border-(--inset-glint)/20 mix-blend-overlay pointer-events-none" />
                            </div>
                        </motion.button>
                    );
                })}

                <div className="shrink-0 w-[20vw] h-full" aria-hidden="true" />
            </section>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </>
    );
}
