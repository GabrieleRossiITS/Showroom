import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { getExhibitions } from "#/api/fetchers";
import { useTranslation } from "react-i18next";
import { GlobalLoader } from "#/components/GlobalLoader";
import Button from "#/components/ui/Button";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/exhibitions/")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    loader: ({ context }) => getExhibitions(context.lang.split("-")[0]),
    component: Expositions,
    staticData: {
        title: "nav.exhibitions",
    },
});

function Expositions() {
    const exhibitions = Route.useLoaderData();
    const { t } = useTranslation();
    const navigate = useNavigate();

    exhibitions.sort((a, b) => {
        if (a.status === "ongoing" && b.status !== "ongoing") return -1;
        if (a.status !== "ongoing" && b.status === "ongoing") return 1;
        return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
    });

    return (
        <div className="min-h-screen bg-(--vintage-sepia) pb-24 pt-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-black text-(--deep-charcoal) font-serif italic tracking-tight mb-6">
                        {t("exhibitions.title")}
                    </h1>
                    <div className="w-24 h-2 bg-(--burnished-copper) rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {exhibitions.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.6,
                                ease: "easeOut",
                            }}
                            onClick={() =>
                                navigate({
                                    to: `/exhibitions/${exp.id}`,
                                })
                            }
                            className={cn(
                                "group relative flex flex-col bg-white/30 backdrop-blur-sm rounded-[3rem] overflow-hidden border border-black/5 hover:border-(--burnished-copper)/20 transition-all duration-500 hover:shadow-2xl hover:shadow-(--burnished-copper)/10 cursor-pointer",
                                exp.status === "past" &&
                                "opacity-50 cursor-not-allowed grayscale pointer-events-none",
                            )}
                        >
                            {/* Image Header */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={exp.imageUrl}
                                    alt={exp.title}
                                    className="w-full translate-y-[-10%] grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 object-fit"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                {/* Status Badge */}
                                <div className="absolute top-6 right-6">
                                    <span
                                        className={`px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase backdrop-blur-md border ${exp.status === "ongoing"
                                            ? "bg-(--burnished-copper) text-white border-(--burnished-copper)/50"
                                            : "bg-black/60 text-white/70 border-white/10"
                                            }`}
                                    >
                                        {t(`exhibitions.${exp.status}`)}
                                    </span>
                                </div>

                                <div className="absolute bottom-6 left-8">
                                    <span className="text-5xl font-black text-white/90 font-mono tracking-tighter">
                                        {new Date(exp.startDate).getFullYear()}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-10 flex-1 flex flex-col justify-between space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-bold text-(--deep-charcoal) font-serif leading-tight group-hover:text-(--burnished-copper) transition-colors">
                                        {exp.title}
                                    </h3>
                                    <p className="text-(--parisian-stone-dark) text-lg line-clamp-2 opacity-80">
                                        {exp.description}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col gap-3 text-sm font-medium text-(--parisian-stone-dark)">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-(--burnished-copper)" />
                                            <span>{exp.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-(--burnished-copper)" />
                                            <span>
                                                {new Date(
                                                    exp.startDate,
                                                ).toLocaleDateString()}{" "}
                                                -{" "}
                                                {new Date(
                                                    exp.endDate,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        rounded="full"
                                        variant={
                                            exp.status === "ongoing"
                                                ? "copper"
                                                : "primary"
                                        }
                                        className="w-full text-sm font-bold tracking-widest uppercase flex gap-3 group/btn py-6"
                                        onClick={() =>
                                            navigate({
                                                to: `/exhibitions/${exp.id}`,
                                            })
                                        }
                                    >
                                        <span>
                                            {t("exhibitionDetail.bookingTitle")}
                                        </span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
