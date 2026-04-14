import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
    Clock,
    Users,
    ChevronLeft,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { getExhibitionById, getExhibitionTimeSlots, getExhibitionTiers } from "#/api/fetchers";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { GlobalLoader } from "#/components/GlobalLoader";
import Button from "#/components/ui/Button";
import { cn } from "#/lib/utils";
import type { ExhibitionTimeSlot, TicketTier } from "#/types";

export const Route = createFileRoute("/exhibitions/$id")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    loader: async ({ params, context }) => {
        const [exhibition, timeSlots, tiers] = await Promise.all([
            getExhibitionById(Number(params.id), context.lang.split("-")[0]),
            getExhibitionTimeSlots(Number(params.id)).catch(() => [] as ExhibitionTimeSlot[]),
            getExhibitionTiers(context.lang.split("-")[0]),
        ]);
        return { exhibition, timeSlots, tiers };
    },

    component: ExhibitionDetail,
});

function ExhibitionDetail() {
    const { exhibition, timeSlots, tiers } = Route.useLoaderData();
    const { t } = useTranslation();
    const navigate = useNavigate();


    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(
        timeSlots.length > 0 ? timeSlots[0].id : null,
    );

    const [selectedTierId, setSelectedTierId] = useState<number | null>(
        tiers.length > 0 ? tiers[0].id : null,
    );
    const [isBooked, setIsBooked] = useState(false);

    const selectedTier = tiers.find((s) => s.id === selectedTierId) ?? null;
    const selectedSlot = timeSlots.find((s) => s.id === selectedSlotId) ?? null;

    useEffect(() => {
        const mainElement = document.getElementById("main-content");
        if (mainElement) mainElement.style.padding = "0";
        return () => {
            if (mainElement) mainElement.style.padding = "";
        };
    }, []);

    const handleBooking = () => {
        if (!selectedTier) return;
        setIsBooked(true);
    };

    if (isBooked) {
        return (
            <div
                key="success-view"
                className="min-h-screen flex items-center justify-center bg-(--vintage-sepia) px-6"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-(--deep-charcoal) p-10 rounded-[3rem] text-center shadow-2xl space-y-6"
                >
                    <div className="flex justify-center">
                        <CheckCircle className="w-20 h-20 text-(--burnished-copper)" />
                    </div>
                    <h2 className="text-3xl font-bold text-(--vintage-sepia-light) font-serif">
                        {t("exhibitionDetail.bookingSuccess")}
                    </h2>
                    <div className="space-y-2">
                        <p className="text-(--parisian-stone) text-lg font-medium leading-relaxed">
                            {exhibition.title}
                        </p>
                        <div className="flex flex-col gap-1 text-sm font-mono text-(--parisian-stone-dark) opacity-80">
                            <span>{selectedTier?.name}</span>
                            {selectedSlot && (
                                <span>
                                    {selectedSlot.startTime.slice(0, 5)} - {selectedSlot.endTime.slice(0, 5)}
                                </span>
                            )}
                        </div>
                    </div>
                    <Button
                        onClick={() => navigate({ to: "/exhibitions" })}
                        className="w-full"
                        rounded="full"
                        size="lg"
                    >
                        {t("exhibitionDetail.back")}
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div
            key="booking-view"
            className="min-h-screen bg-(--vintage-sepia) pb-24 overflow-x-hidden"
        >
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src={exhibition.imageUrl}
                    className="w-full grayscale brightness-[0.5] translate-y-[-25%]"
                    alt={exhibition.title}
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12 max-w-5xl mx-auto mb-8">
                    <button
                        onClick={() => navigate({ to: "/exhibitions" })}
                        className="flex items-center gap-2 text-(--vintage-sepia) mb-6 hover:text-(--burnished-copper) transition-colors font-semibold tracking-wide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        {t("exhibitionDetail.back")}
                    </button>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-(--vintage-sepia-light) font-serif leading-tight drop-shadow-lg"
                    >
                        {exhibition.title}
                    </motion.h1>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        <p className="text-xl text-(--parisian-stone-dark) leading-relaxed">
                            {exhibition.description}
                        </p>
                    </motion.section>

                    {/* Time Slots */}
                    <section className="space-y-6">
                        <h3 className="text-2xl font-bold text-(--deep-charcoal) font-serif flex items-center gap-3">
                            <Clock className="w-6 h-6 text-(--burnished-copper)" />
                            {t("exhibitionDetail.chooseTime")}
                        </h3>
                        {timeSlots.length > 0 ? (
                            <div
                                role="radiogroup"
                                aria-label={t("exhibitionDetail.chooseTime")}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {timeSlots.map((slot: ExhibitionTimeSlot) => {
                                    const isSelected = selectedSlotId === slot.id;
                                    return (
                                        <motion.button
                                            key={slot.id}
                                            whileHover={{ y: -4 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedSlotId(slot.id)}
                                            aria-checked={isSelected}
                                            role="radio"
                                            className={cn(
                                                "relative flex flex-col items-start p-6 rounded-4xl transition-all duration-300 border-2 text-left",
                                                isSelected
                                                    ? "bg-(--deep-charcoal) border-(--burnished-copper) shadow-xl"
                                                    : "bg-black/5 border-transparent hover:bg-black/10",
                                            )}
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <div
                                                    className={cn(
                                                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                                        isSelected
                                                            ? "bg-(--burnished-copper) text-(--vintage-sepia-light)"
                                                            : "bg-black/10 text-(--parisian-stone)",
                                                    )}
                                                >
                                                    <Clock className="w-5 h-5" />
                                                </div>
                                                <span
                                                    className={cn(
                                                        "text-lg font-bold font-serif",
                                                        isSelected
                                                            ? "text-(--vintage-sepia-light)"
                                                            : "text-(--deep-charcoal)",
                                                    )}
                                                >
                                                    {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}
                                                </span>
                                            </div>
                                            <div
                                                className={cn(
                                                    "text-sm font-medium tracking-wide opacity-70",
                                                    isSelected ? "text-white/60" : "text-(--parisian-stone-dark)",
                                                )}
                                            >
                                                {slot.daysOfWeek
                                                    .map((day: number) => t("common.days." + day))
                                                    .join(", ")}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-10 rounded-4xl bg-black/5 border-2 border-dashed border-black/10 text-center flex flex-col items-center gap-3">
                                <AlertCircle className="w-8 h-8 text-(--parisian-stone)" />
                                <p className="font-medium text-(--parisian-stone-dark)">
                                    {t("exhibitions.past")}
                                </p>
                            </div>
                        )}
                    </section>

                    {/* Ticket Price Info */}
                    <section className="space-y-6">
                        <h3 className="text-2xl font-bold text-(--deep-charcoal) font-serif flex items-center gap-3">
                            <Users className="w-6 h-6 text-(--burnished-copper)" />
                            {t("exhibitionDetail.selectTier")}
                        </h3>
                        <div
                            role="radiogroup"
                            aria-label={t("exhibitionDetail.selectTier")}
                            className="space-y-4"
                        >
                            {tiers.map((tier: TicketTier) => {
                                const isSelected = selectedTierId === tier.id;
                                return (
                                    <motion.button
                                        key={tier.id}
                                        whileHover={{ x: 8 }}
                                        onClick={() => setSelectedTierId(tier.id)}
                                        role="radio"
                                        aria-checked={isSelected}
                                        className={cn(
                                            "w-full p-6 rounded-4xl border-2 flex items-center justify-between transition-all duration-300 group relative",
                                            isSelected
                                                ? "bg-(--deep-charcoal) border-(--burnished-copper) shadow-xl"
                                                : "bg-black/5 border-transparent hover:bg-black/10",
                                        )}
                                    >
                                        <div className="text-left">
                                            <span
                                                className={cn(
                                                    "block text-lg font-bold transition-colors",
                                                    isSelected ? "text-(--vintage-sepia-light)" : "text-(--deep-charcoal)",
                                                )}
                                            >
                                                {tier.name}
                                            </span>
                                            <span
                                                className={cn(
                                                    "text-sm font-medium opacity-60",
                                                    isSelected ? "text-white/40" : "text-(--parisian-stone-dark)",
                                                )}
                                            >
                                                {tier.description}
                                            </span>
                                        </div>
                                        <div className="text-right min-w-16">
                                            <span className="text-2xl font-black text-(--burnished-copper) font-mono">
                                                {tier.price}€
                                            </span>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* Sticky Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 p-8 rounded-[2.5rem] bg-(--deep-charcoal) text-(--vintage-sepia-light) shadow-2xl border border-white/5 space-y-8">
                        <h4 className="text-xl font-bold font-serif pb-4 border-b border-white/10">
                            Summary
                        </h4>
                        <div className="space-y-6 font-medium text-sm tracking-wide">
                            <div className="flex justify-between items-end border-b border-white/5 pb-3">
                                <span className="uppercase opacity-50 text-[10px] font-bold tracking-widest min-w-16">Exhibition</span>
                                <span className="font-serif text-right max-w-[160px] text-base leading-tight">
                                    {exhibition.name}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <span className="uppercase opacity-50 text-[10px] font-bold tracking-widest min-w-16">Day</span>
                                <span
                                    className={cn(
                                        "font-mono text-base",
                                        !selectedSlot && "text-white/20 italic",
                                    )}
                                >
                                    {selectedSlot
                                        ? selectedSlot.daysOfWeek.map((d: number) => t("common.days." + d)).join(", ")
                                        : "--"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <span className="uppercase opacity-50 text-[10px] font-bold tracking-widest min-w-16">Time</span>
                                <span
                                    className={cn(
                                        "font-mono text-base",
                                        !selectedSlot && "text-white/20 italic",
                                    )}
                                >
                                    {selectedSlot
                                        ? `${selectedSlot.startTime.slice(0, 5)} - ${selectedSlot.endTime.slice(0, 5)}`
                                        : "--"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="uppercase opacity-50 text-[10px] font-bold tracking-widest min-w-16">Tier</span>
                                <span
                                    className={cn(
                                        "font-mono text-base",
                                        !selectedTier && "text-white/20 italic",
                                    )}
                                >
                                    {selectedTier ? selectedTier.name : "--"}
                                </span>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                            <span className="font-bold uppercase tracking-widest text-xs opacity-60">
                                Total
                            </span>
                            <span className="text-4xl font-black text-(--burnished-copper) font-mono">
                                {selectedTier?.price ?? 0}€
                            </span>
                        </div>
                        <Button
                            disabled={!selectedSlot}
                            onClick={handleBooking}
                            variant="copper"
                            rounded="full"
                            className="w-full py-6 text-base font-bold shadow-xl disabled:opacity-30 disabled:translate-y-0"
                            size="lg"
                        >
                            {t("exhibitionDetail.confirmBooking")}
                        </Button>
                        {!selectedSlot && timeSlots.length > 0 && (
                            <div className="flex items-center gap-2 text-xs text-white/40 justify-center">
                                <AlertCircle className="w-3 h-3" />
                                Please select a time slot
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
