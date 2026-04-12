import { Calendar, Package, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import type { Order } from "#/types";
import { getUserOrderById } from "#/api/fetchers";
import { useAuth } from "#/components/contexts/AuthContext";
import EmptyState from "./EmptyState";

type Props = {
    orders: Order[];
};

export default function OrdersTab({ orders }: Props) {
    const { t } = useTranslation();

    if (orders.length === 0) {
        return (
            <EmptyState
                icon={
                    <Package className="w-12 h-12 text-(--parisian-stone)/40" />
                }
                message={t("account.ordersTab.noOrders")}
                linkTo="/shop"
                linkLabel={t("account.ordersTab.goShop")}
            />
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
}

function OrderCard({ order }: { order: Order }) {
    const { t, i18n } = useTranslation();
    const { user } = useAuth();
    const [detailedOrder, setDetailedOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const lang = i18n.language.split("-")[0];

    useEffect(() => {
        if (!user?.id) return;

        const fetchDetails = async () => {
            try {
                setLoading(true);
                const data = await getUserOrderById(user.id, order.id, lang);
                setDetailedOrder(data);
                setError(false);
            } catch (err) {
                console.error(
                    `Failed to fetch items for order ${order.id}`,
                    err,
                );
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [order.id, user?.id, lang]);

    const items = detailedOrder?.items || [];

    return (
        <div className="bg-white/40 backdrop-blur-xl rounded-4xl border border-white/60 shadow-sm p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-(--parisian-stone) mb-1">
                        {t("account.ordersTab.order")} #{order.id}
                    </p>
                    <p className="text-sm text-(--parisian-stone-dark) opacity-70 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper-deep) text-xs font-bold uppercase tracking-wider mb-2">
                        {order.status}
                    </span>
                    <p className="text-2xl font-black text-(--burnished-copper) font-mono">
                        {order.totalAmount.toFixed(2)}€
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                {loading ? (
                    <div className="flex items-center justify-center py-4 text-(--parisian-stone) gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-xs font-medium uppercase tracking-wider">
                            {t("account.ordersTab.loadingItems")}
                        </span>
                    </div>
                ) : error ? (
                    <p className="text-xs text-red-500/70 italic text-center py-2">
                        {t("account.ordersTab.orderItemsError")}
                    </p>
                ) : items.length > 0 ? (
                    items.map((item, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center text-sm py-2 border-t border-black/5"
                        >
                            <span className="text-(--parisian-stone-dark) font-medium">
                                {item.souvenirName}{" "}
                                <span className="opacity-50">
                                    x{item.quantity}
                                </span>
                            </span>
                            <span className="font-mono font-bold text-(--deep-charcoal)">
                                {(item.unitPrice * item.quantity).toFixed(2)}€
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-(--parisian-stone) italic text-center py-2">
                        {t("account.ordersTab.noItemsInOrder")}
                    </p>
                )}
            </div>
        </div>
    );
}
