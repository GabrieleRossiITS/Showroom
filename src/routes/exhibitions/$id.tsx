import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
    Clock,
    Users,
    ChevronLeft,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { getExhibitionById } from "public/api/fetchers";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { GlobalLoader } from "#/components/GlobalLoader";
import Button from "#/components/ui/Button";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/exhibitions/$id")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    loader: ({ params }) => getExhibitionById(Number(params.id)),
    component: ExhibitionDetail,
});

function ExhibitionDetail() {
    const exhibition = Route.useLoaderData();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedTier, setSelectedTier] = useState<string>("standard");
    const [isBooked, setIsBooked] = useState(false);

    const ticketTiers = exhibition.ticket_info.tiers.map((tier: any) => ({
        ...tier,
        name: t(tier.nameKey),
        desc: t(tier.descKey),
    }));

    const handleBooking = () => {
        if (!selectedSlot) return;
        setIsBooked(true);
    };

    if (isBooked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-(--vintage-sepia) px-6">
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
                    <p className="text-(--parisian-stone) text-lg">
                        {exhibition.title} <br />
                        <span className="font-mono mt-2 block">
                            {selectedSlot} |{" "}
                            {
                                ticketTiers.find(
                                    (tier: any) => tier.id === selectedTier,
                                )?.name
                            }
                        </span>
                    </p>
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

    useEffect(() => {
        const mainElement = document.getElementById("main-content");

        if (mainElement) {
            mainElement.style.padding = '0';
        }

        return () => {
            if (mainElement) {
                mainElement.style.padding = '';
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-(--vintage-sepia) pb-24 overflow-x-hidden">
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src={exhibition.image}
                    className="w-full h-full object-cover grayscale brightness-[0.4]"
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

                    <section className="space-y-6">
                        <h3 className="text-2xl font-bold text-(--deep-charcoal) font-serif flex items-center gap-3">
                            <Clock className="w-6 h-6 text-(--burnished-copper)" />
                            {t("exhibitionDetail.chooseTime")}
                        </h3>
                        {exhibition.ticket_info.slots.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {exhibition.ticket_info.slots.map(
                                    (slot: any) => {
                                        const isFull = slot.ticketsLeft === 0;
                                        return (
                                            <button
                                                key={slot.time}
                                                disabled={isFull}
                                                onClick={() =>
                                                    setSelectedSlot(slot.time)
                                                }
                                                className={cn(
                                                    "relative p-4 rounded-3xl border-2 transition-all duration-300 text-left",
                                                    selectedSlot === slot.time
                                                        ? "bg-(--deep-charcoal) border-(--deep-charcoal) text-white shadow-xl scale-[1.02]"
                                                        : "bg-white/40 border-black/5 hover:border-(--burnished-copper)/30",
                                                    isFull &&
                                                    "opacity-50 cursor-not-allowed bg-black/5",
                                                )}
                                            >
                                                <span className="block text-xl font-bold font-mono">
                                                    {slot.time}
                                                </span>
                                                <span
                                                    className={cn(
                                                        "text-xs font-bold uppercase tracking-wider",
                                                        isFull
                                                            ? "text-red-500"
                                                            : slot.ticketsLeft <
                                                                10
                                                                ? "text-(--burnished-copper)"
                                                                : "text-(--parisian-stone)",
                                                    )}
                                                >
                                                    {isFull
                                                        ? "Full"
                                                        : `${slot.ticketsLeft} ${t("exhibitionDetail.ticketsLeft")}`}
                                                </span>
                                            </button>
                                        );
                                    },
                                )}
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

                    {/* Ticket Tiers */}
                    <section className="space-y-6">
                        <h3 className="text-2xl font-bold text-(--deep-charcoal) font-serif flex items-center gap-3">
                            <Users className="w-6 h-6 text-(--burnished-copper)" />
                            {t("exhibitionDetail.selectTier")}
                        </h3>
                        <div className="space-y-4">
                            {ticketTiers.map((tier: any) => (
                                <button
                                    key={tier.id}
                                    onClick={() => setSelectedTier(tier.id)}
                                    className={cn(
                                        "w-full p-6 rounded-4xl border-2 flex items-center justify-between transition-all duration-300 group",
                                        selectedTier === tier.id
                                            ? "bg-(--deep-charcoal)/5 border-(--deep-charcoal) ring-1 ring-(--deep-charcoal)/20"
                                            : "bg-black/5 border-transparent hover:bg-black/10",
                                    )}
                                >
                                    <div className="text-left">
                                        <span className="block text-lg font-bold text-(--deep-charcoal)">
                                            {tier.name}
                                        </span>
                                        <span className="text-sm text-(--parisian-stone-dark)">
                                            {tier.desc}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-(--burnished-copper) font-mono">
                                            {tier.price}€
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sticky Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 p-8 rounded-[2.5rem] bg-(--deep-charcoal) text-(--vintage-sepia-light) shadow-2xl border border-white/5 space-y-8">
                        <h4 className="text-xl font-bold font-serif pb-4 border-b border-white/10">
                            Summary
                        </h4>
                        <div className="space-y-4 font-medium opacity-80 text-sm tracking-wide">
                            <div className="flex justify-between uppercase">
                                <span>Date</span>
                                <span className="font-mono">
                                    {new Date().toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between uppercase">
                                <span>Time Slot</span>
                                <span
                                    className={cn(
                                        "font-mono",
                                        !selectedSlot && "text-white/30 italic",
                                    )}
                                >
                                    {selectedSlot || "Not selected"}
                                </span>
                            </div>
                            <div className="flex justify-between uppercase">
                                <span>Tier</span>
                                <span className="font-mono">
                                    {
                                        ticketTiers.find(
                                            (tier: any) =>
                                                tier.id === selectedTier,
                                        )?.name
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                            <span className="font-bold uppercase tracking-widest text-xs opacity-60">
                                Total
                            </span>
                            <span className="text-4xl font-black text-(--burnished-copper) font-mono">
                                {
                                    ticketTiers.find(
                                        (tier: any) => tier.id === selectedTier,
                                    )?.price
                                }
                                €
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
                        {!selectedSlot &&
                            exhibition.ticket_info.slots.length > 0 && (
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
