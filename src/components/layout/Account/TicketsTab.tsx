import { Ticket } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Ticket as TicketType } from "#/types";
import EmptyState from "./EmptyState";

type Props = {
    tickets: TicketType[];
};

export default function TicketsTab({ tickets }: Props) {
    const { t } = useTranslation();

    if (tickets.length === 0) {
        return (
            <EmptyState
                icon={
                    <Ticket className="w-12 h-12 text-(--parisian-stone)/40" />
                }
                message={t("account.ticketsTab.noTickets")}
                linkTo="/exhibitions"
                linkLabel={t("account.ticketsTab.goExhibitions")}
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((ticket) => (
                <div
                    key={ticket.id}
                    className="bg-(--deep-charcoal) rounded-4xl p-6 space-y-4 relative overflow-hidden"
                >
                    {/* Decorative perforation line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-white/10 pointer-events-none hidden md:block" />

                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-1">
                                {t("account.ticketsTab.exhibition")}
                            </p>
                            <h3 className="text-lg font-bold font-serif text-(--vintage-sepia-light) leading-tight">
                                {ticket.exhibitionTitle}
                            </h3>
                        </div>
                        <Ticket className="w-6 h-6 text-(--burnished-copper) shrink-0 mt-1" />
                    </div>

                    <div className="flex gap-6 text-sm text-(--parisian-stone)">
                        <div>
                            <p className="text-[9px] uppercase tracking-widest font-bold opacity-50 mb-0.5">
                                {t("account.ticketsTab.date")}
                            </p>
                            <p className="font-mono font-bold text-(--vintage-sepia-light)">
                                {new Date(
                                    ticket.visitDate,
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-widest font-bold opacity-50 mb-0.5">
                                {t("account.ticketsTab.hour")}
                            </p>
                            <p className="font-mono font-bold text-(--vintage-sepia-light)">
                                {ticket.slotStartTime
                                    ? ticket.slotStartTime.substring(0, 5)
                                    : "--:--"}
                            </p>
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-widest font-bold opacity-50 mb-0.5">
                                {t("account.ticketsTab.tier")}
                            </p>
                            <p className="font-bold text-(--burnished-copper)">
                                {ticket.tierName}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                        <span className="text-xs font-mono text-white/30">
                            #{ticket.id}
                        </span>
                        <span className="text-xl font-black text-(--burnished-copper) font-mono">
                            {ticket.tierPrice}€
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
