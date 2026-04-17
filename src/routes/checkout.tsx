import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import CartCheckout from "#/components/layout/CartCheckout";
import TicketCheckout from "#/components/layout/TicketCheckout";
import type { TicketCheckoutData } from "#/types";

export const Route = createFileRoute("/checkout")({
    validateSearch: (search: Record<string, unknown>) => {
        return {
            type: search.type as "cart" | "ticket",
        };
    },
    component: CheckoutPage,
    staticData: {
        title: "nav.checkout",
    },
});

function CheckoutPage() {
    const { t } = useTranslation();
    const { type } = Route.useSearch();
    const location = useLocation();

    const ticketData = location.state as unknown as TicketCheckoutData | undefined;

    return (
        type === "ticket" && ticketData ? (
            <TicketCheckout t={t} ticket={ticketData} />
        ) : (
            <CartCheckout t={t} />
        )
    );
}
