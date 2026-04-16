import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import {
    CreditCard,
    Lock,
    ArrowLeft,
    ShieldCheck,
    Loader2,
} from "lucide-react";
import type { TFunction } from 'i18next';
import { useTicket } from '../contexts/TicketContext';
import type { TicketCheckoutData } from '#/types';

type Props = {
    t: TFunction<"translation", undefined>;
    ticket: TicketCheckoutData;
}

export default function TicketCheckout({ t, ticket }: Props) {
    const navigate = useNavigate();
    const { addTicket } = useTicket();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirmPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await addTicket({
                exhibitionId: ticket.exhibitionId,
                tierId: ticket.tierId,
                userId: 0,
                visitDate: ticket.visitDate,
                timeSlotId: ticket.timeSlotId,
            });
            navigate({ to: "/order-success" });
        } catch (error) {
            console.error("Payment failed:", error);
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-(--vintage-sepia) pt-40 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Button
                        variant="ghost"
                        onClick={() => navigate({ to: `/exhibitions/${ticket.exhibitionId}` })}
                        className="group gap-2 text-(--parisian-stone-dark) bg-white/20 rounded-full px-6"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        {t("checkout.backToExhibition", "Back to Exhibition")}
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/40 backdrop-blur-xl rounded-4xl border border-white/60 p-8 shadow-sm space-y-8"
                    >
                        <div className="flex items-center gap-4 border-b border-black/5 pb-6">
                            <div className="w-12 h-12 rounded-2xl bg-(--burnished-copper)/10 flex items-center justify-center text-(--burnished-copper)">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-serif font-bold text-(--deep-charcoal)">
                                    {t("checkout.paymentMethod")}
                                </h2>
                                <p className="text-xs text-(--parisian-stone) opacity-70">
                                    {t("checkout.secureNote")}
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleConfirmPayment} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-(--parisian-stone) ml-1">
                                    {t("checkout.cardNumber")}
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full h-14 px-6 rounded-2xl bg-white/50 border border-black/5 focus:border-(--burnished-copper) focus:outline-none transition-colors font-mono tracking-widest"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-(--parisian-stone) ml-1">
                                        {t("checkout.expiry")}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="MM / YY"
                                        className="w-full h-14 px-6 rounded-2xl bg-white/50 border border-black/5 focus:border-(--burnished-copper) focus:outline-none transition-colors font-mono tracking-widest"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-(--parisian-stone) ml-1">
                                        {t("checkout.cvv")}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="000"
                                        className="w-full h-14 px-6 rounded-2xl bg-white/50 border border-black/5 focus:border-(--burnished-copper) focus:outline-none transition-colors font-mono tracking-widest"
                                    />
                                </div>
                            </div>

                            <Button
                                disabled={isProcessing}
                                variant="copper"
                                rounded="full"
                                size="lg"
                                className="w-full h-16 shadow-xl shadow-(--burnished-copper)/20 overflow-hidden relative group"
                            >
                                {isProcessing ? (
                                    <span className="flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {t("checkout.processing")}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-3">
                                        <ShieldCheck className="w-5 h-5" />
                                        {t("checkout.payNow")} {ticket.tierPrice.toFixed(2)}€
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            </Button>
                        </form>

                        <div className="flex items-center justify-center gap-2 text-(--parisian-stone) opacity-40">
                            <Lock className="w-3 h-3" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
                                Encrypted by TLS 1.3
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="bg-black/5 rounded-4xl p-8 space-y-6">
                            <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-(--parisian-stone) border-b border-black/5 pb-4">
                                {t("checkout.ticketSummary", "Ticket Summary")}
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-mono uppercase opacity-50">{t("checkout.exhibition", "Exhibition")}</span>
                                    <span className="text-sm font-bold text-(--deep-charcoal) text-right max-w-[200px]">
                                        {ticket.exhibitionTitle}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-mono uppercase opacity-50">{t("checkout.tier", "Tier")}</span>
                                    <span className="text-sm font-bold text-(--deep-charcoal)">{ticket.tierName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-mono uppercase opacity-50">{t("checkout.date", "Date")}</span>
                                    <span className="text-sm font-mono font-bold text-(--parisian-stone-dark)">{ticket.visitDate}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-mono uppercase opacity-50">{t("checkout.time", "Time")}</span>
                                    <span className="text-sm font-mono font-bold text-(--parisian-stone-dark)">{ticket.slotDisplay}</span>
                                </div>
                            </div>

                            <div className="border-t border-black/5 pt-4 space-y-2">
                                <div className="flex justify-between text-lg font-black text-(--burnished-copper)">
                                    <span>{t("checkout.total")}</span>
                                    <span className="font-mono">
                                        {ticket.tierPrice.toFixed(2)}€
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
