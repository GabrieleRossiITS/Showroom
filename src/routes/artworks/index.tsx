import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "#/components/ui/Button";
import { getArtworks } from "public/api/fetchers";
import { createArtworkSlug } from "#/components/utlis";

export const Route = createFileRoute("/artworks/")({
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
            <div className="absolute inset-0 pointer-events-none z-0 bg-(--deep-charcoal)">
                <div className="absolute top-[-10%] left-[-5%] w-[120vw] h-[70vh] bg-(--burnished-copper-deep) rounded-[40%_60%_70%_30%/40%_40%_60%_50%] origin-center rotate-[-5deg] shadow-2xl" />
                <div className="absolute bottom-[-15%] left-[30vw] w-screen h-[80vh] bg-(--burnished-copper) rounded-[30%_70%_50%_50%/50%_30%_70%_50%] origin-center rotate-[5deg] shadow-2xl" />
                <div className="absolute top-[20%] left-[80vw] w-screen h-screen bg-(--burnished-copper-deep) rounded-[50%_50%_30%_70%/60%_40%_60%_40%] origin-center rotate-15 shadow-2xl" />
            </div>

            <div className="absolute inset-0 pointer-events-none z-50 p-12 flex flex-col justify-between">
                <div className="flex justify-between items-end h-full pb-10">
                    <Button
                        onClick={() => scroll("left")}
                        variant="ghost"
                        size="icon"
                        rounded="full"
                        className="w-14 h-14 bg-(--parisian-stone)/10 hover:bg-(--parisian-stone)/30 border border-(--parisian-stone)/20 backdrop-blur-md text-(--vintage-sepia) pointer-events-auto"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <Button
                        onClick={() => scroll("right")}
                        variant="ghost"
                        size="icon"
                        rounded="full"
                        className="w-14 h-14 bg-(--parisian-stone)/10 hover:bg-(--parisian-stone)/30 border border-(--parisian-stone)/20 backdrop-blur-md text-(--vintage-sepia) pointer-events-auto"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </Button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="relative z-10 h-[85vh] flex items-center overflow-x-auto overflow-y-hidden no-scrollbar gap-20 px-24"
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
                        <motion.div
                            key={art.id}
                            className={`shrink-0 ${hClass} ${aspectClass} ${alignClass} transition-transform hover:scale-[1.05] duration-500 cursor-pointer group`}
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
                        </motion.div>
                    );
                })}

                <div className="shrink-0 w-[20vw] h-full" />
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </>
    );
}
