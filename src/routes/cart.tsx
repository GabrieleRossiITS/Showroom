import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trash2,
    ShoppingBag,
    ArrowRight,
    Loader2,
    Package,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCart } from "#/components/contexts/CartContext";
import { GlobalLoader } from "#/components/GlobalLoader";
import Button from "#/components/ui/Button";
import { useState } from "react";
import type { CartItem } from "#/types";

export const Route = createFileRoute("/cart")({
    component: CartPage,
    staticData: {
        title: "Carrello — Robert Doisneau",
    },
});

function CartPage() {
    const { t } = useTranslation();
    const { cart, isLoading, removeFromCart } = useCart();
    const navigate = useNavigate();

    if (isLoading && !cart) {
        return <GlobalLoader />;
    }

    const hasItems = cart && cart.items.length > 0;

    return (
        <div className="min-h-screen bg-(--vintage-sepia) pt-40 pb-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--burnished-copper)/10 border border-(--burnished-copper)/20 text-(--burnished-copper-deep) text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                        <ShoppingBag className="w-3 h-3" />
                        {t("cart.label")}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold italic text-(--deep-charcoal) tracking-tight">
                        {t("cart.title")}
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
                    {/* ── Items List ── */}
                    <div className="space-y-6">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {hasItems ? (
                                cart.items.map((item) => (
                                    <CartItemRow
                                        key={item.id}
                                        item={item}
                                        onRemove={() =>
                                            removeFromCart(item.souvenirId)
                                        }
                                    />
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white/40 backdrop-blur-xl rounded-4xl border border-white/60 p-12 text-center flex flex-col items-center gap-6"
                                >
                                    <div className="w-20 h-20 rounded-full bg-(--vintage-sepia) flex items-center justify-center text-(--parisian-stone)/30">
                                        <Package className="w-10 h-10" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-serif font-bold text-(--deep-charcoal)">
                                            {t("cart.empty")}
                                        </h2>
                                        <p className="text-(--parisian-stone-dark) opacity-70">
                                            {t("cart.emptySubtitle")}
                                        </p>
                                    </div>
                                    <Button
                                        variant="copper"
                                        rounded="full"
                                        size="lg"
                                        onClick={() =>
                                            navigate({ to: "/shop" })
                                        }
                                        className="mt-4"
                                    >
                                        {t("cart.goToShop")}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── Summary ── */}
                    {hasItems && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="sticky top-40 bg-(--deep-charcoal) rounded-4xl p-8 text-(--vintage-sepia-light) shadow-2xl space-y-8"
                        >
                            <h2 className="text-xl font-serif italic font-bold border-b border-white/10 pb-4">
                                {t("cart.summary")}
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm opacity-70">
                                    <span>{t("cart.subtotal")}</span>
                                    <span className="font-mono">
                                        {cart.items
                                            .reduce(
                                                (acc, item) =>
                                                    acc +
                                                    item.souvenirPrice *
                                                    item.quantity,
                                                0,
                                            )
                                            .toFixed(2)}
                                        €
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm opacity-70">
                                    <span>{t("cart.shipping")}</span>
                                    <span className="font-mono">
                                        {t("cart.free")}
                                    </span>
                                </div>
                                <div className="h-px bg-white/10 my-4" />
                                <div className="flex justify-between items-baseline">
                                    <span className="text-lg font-bold">
                                        {t("cart.total")}
                                    </span>
                                    <span className="text-3xl font-black text-(--burnished-copper) font-mono">
                                        {cart.items
                                            .reduce(
                                                (acc, item) =>
                                                    acc +
                                                    item.souvenirPrice *
                                                    item.quantity,
                                                0,
                                            )
                                            .toFixed(2)}
                                        €
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="copper"
                                rounded="full"
                                size="lg"
                                className="w-full group"
                                onClick={() => navigate({ to: "/checkout" })}
                            >
                                {t("cart.checkout")}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <p className="text-[10px] text-center opacity-40 uppercase tracking-[0.2em] font-bold">
                                {t("cart.secureMessage")}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

function CartItemRow({
    item,
    onRemove,
}: {
    item: CartItem;
    onRemove: () => void;
}) {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = async () => {
        setIsRemoving(true);
        try {
            await onRemove();
        } catch {
            setIsRemoving(false);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, x: -20 }}
            className="group relative flex flex-col sm:flex-row items-center gap-6 p-6 md:p-8 bg-white/40 backdrop-blur-xl rounded-4xl border border-white/60 shadow-sm hover:shadow-md transition-all duration-500"
        >
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-(--vintage-sepia) shrink-0 shadow-inner">
                <img
                    src={item.souvenirImageUrl}
                    alt={item.souvenirName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            <div className="flex-1 space-y-1 text-center sm:text-left">
                <h3 className="text-xl font-serif font-bold text-(--deep-charcoal) leading-tight">
                    {item.souvenirName}
                </h3>
                <p className="text-sm text-(--parisian-stone) font-mono">
                    {item.souvenirPrice.toFixed(2)}€ x {item.quantity}
                </p>
            </div>

            <div className="flex items-center gap-8">
                <div className="text-right">
                    <p className="text-2xl font-black text-(--burnished-copper) font-mono">
                        {(item.souvenirPrice * item.quantity).toFixed(2)}€
                    </p>
                </div>

                <button
                    onClick={handleRemove}
                    disabled={isRemoving}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 active:scale-90 disabled:opacity-50"
                >
                    {isRemoving ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Trash2 className="w-5 h-5" />
                    )}
                </button>
            </div>
        </motion.div>
    );
}
