import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ShoppingBag,
    Package,
    Tag,
    CheckCircle2,
    AlertCircle,
    Ruler,
    Loader2,
    User,
} from "lucide-react";
import { getSouvenirById } from "#/api/fetchers";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { GlobalLoader } from "#/components/GlobalLoader";
import Button from "#/components/ui/Button";
import { ProtectedImage } from "#/components/ui/ProtectedImage";
import { useCart } from "#/components/contexts/CartContext";
import { useAuth } from "#/components/contexts/AuthContext";
import { JsonList } from "#/components/ui/JsonList";

// ─── Loader ───────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/shop/$id")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    loader: ({ params, context }) =>
        getSouvenirById(Number(params.id), context.lang.split("-")[0]),
    component: SouvenirDetail,
    staticData: {
        title: "Détail — Boutique",
    },
});

// ─── Component ────────────────────────────────────────────────────────────────

function SouvenirDetail() {
    const item = Route.useLoaderData();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            await addToCart({ souvenirId: item.id, quantity: qty });
            setAdded(true);
            setTimeout(() => setAdded(false), 2500);
        } catch (error) {
            console.error("Failed to add to cart:", error);
        } finally {
            setIsAdding(false);
        }
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
    };

    const imageIn = {
        initial: { opacity: 0, scale: 0.92, rotate: -1.5 },
        animate: { opacity: 1, scale: 1, rotate: 0 },
        transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as any },
    };

    return (
        <div className="page-wrap z-10 max-w-7xl mx-auto mt-16  mb-24">
            {/* ── Back button ── */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-12 md:mb-16"
            >
                <Button
                    onClick={() => navigate({ to: "/shop" })}
                    variant="ghost"
                    className="group gap-2 text-(--parisian-stone-dark) hover:text-(--deep-charcoal) bg-white/20 backdrop-blur-md border border-white/40 rounded-full px-6"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t("shop.backToShop", "Torna al negozio")}
                </Button>
            </motion.div>

            {/* ── Two-column layout ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24 items-start">
                {/* ── Left: image panel ── */}
                <motion.div {...imageIn} className="relative group">
                    {/* Glow halo */}
                    <div className="absolute -inset-4 bg-(--burnished-copper)/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-full" />

                    {/* Frame */}
                    <div className="relative z-10 p-4 md:p-5 bg-(--burnished-copper) rounded-[2.5rem] shadow-2xl shadow-(--deep-charcoal)/30 transition-transform duration-700 group-hover:scale-[1.02]">
                        <div className="relative bg-(--deep-charcoal) rounded-[1.8rem] overflow-hidden shadow-[inset_0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 aspect-square">
                            <ProtectedImage
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />
                        </div>
                        <div className="absolute inset-0 rounded-[2.5rem] border border-white/30 mix-blend-overlay pointer-events-none" />
                    </div>

                    {/* Price tag badge */}
                    <div className="hidden md:flex absolute -right-5 top-12 z-20 flex-col items-center bg-(--deep-charcoal) text-(--vintage-sepia) p-4 pb-5 rounded-3xl shadow-xl border border-white/10 -rotate-2">
                        <div className="text-[9px] font-mono tracking-widest uppercase opacity-50 mb-1">
                            Prezzo
                        </div>
                        <div className="text-2xl font-black text-(--burnished-copper) font-mono">
                            {item.price}€
                        </div>
                    </div>
                </motion.div>

                {/* ── Right: info panel ── */}
                <div className="flex flex-col gap-8">
                    <motion.div {...fadeIn}>
                        {/* Category pill */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper-deep) text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-(--burnished-copper)/20">
                            <Tag className="w-3 h-3" />
                            {item.category}
                        </div>

                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-(--deep-charcoal) leading-[1.05] tracking-tight italic mb-4">
                            {item.name}
                        </h1>

                        {/* Divider + price (mobile) */}
                        <div className="flex items-baseline gap-4 mb-8 md:hidden">
                            <div className="h-px w-12 bg-(--burnished-copper)/40" />
                            <span className="text-4xl font-black text-(--burnished-copper) font-mono">
                                {item.price}€
                            </span>
                        </div>

                        {/* Stock status */}
                        {item.inStock ? (
                            <div className="flex items-center gap-2 text-emerald-700 text-sm font-bold mb-2">
                                <CheckCircle2 className="w-4 h-4" />
                                {t("shop.inStock")}
                                {item.quantityAvailable <= 10 && (
                                    <span className="text-(--burnished-copper) ml-2">
                                        — {t("shop.only")}{" "}
                                        {item.quantityAvailable}{" "}
                                        {t("shop.remaining")}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-red-600 text-sm font-bold mb-2">
                                <AlertCircle className="w-4 h-4" />
                                {t("shop.outOfStock")}
                            </div>
                        )}
                    </motion.div>

                    {/* Description card */}
                    <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
                        <div className="bg-white/40 backdrop-blur-xl p-8 rounded-4xl border border-white/60 shadow-sm space-y-2">
                            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-(--parisian-stone) mb-3">
                                {t("shop.description", "Descrizione")}
                            </h3>
                            <p className="text-(--parisian-stone-dark) leading-relaxed text-lg font-serif">
                                {item.fullDescription || item.shortDescription}
                            </p>
                        </div>
                    </motion.div>

                    {/* Specs */}
                    {item.specifications && (
                        <motion.div {...fadeIn} transition={{ delay: 0.25 }}>
                            <div className="bg-(--vintage-sepia-light)/50 backdrop-blur-md p-6 rounded-3xl border border-(--line) space-y-2">
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-(--parisian-stone) mb-3">
                                    <Ruler className="w-3.5 h-3.5" />
                                    {t("shop.specs")}
                                </div>
                                <p className="font-serif text-(--deep-charcoal) text-base leading-relaxed">
                                    <JsonList
                                        jsonString={item.specifications}
                                    />
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Quantity + CTA */}
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.35 }}
                        className="space-y-4"
                    >
                        {/* Qty stepper */}
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-(--parisian-stone)">
                                {t("shop.qty", "Quantità")}
                            </span>
                            <div className="flex items-center gap-2 bg-white/40 border border-white/60 rounded-full px-2 py-1 backdrop-blur-md">
                                <button
                                    onClick={() =>
                                        setQty((q) => Math.max(1, q - 1))
                                    }
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-(--parisian-stone-dark) hover:bg-black/10 transition-colors font-bold text-lg cursor-pointer"
                                    aria-label="Diminuisci quantità"
                                >
                                    −
                                </button>
                                <span className="w-8 text-center font-bold font-mono text-(--deep-charcoal)">
                                    {qty}
                                </span>
                                <button
                                    onClick={() =>
                                        setQty((q) =>
                                            Math.min(
                                                item.quantityAvailable || 99,
                                                q + 1,
                                            ),
                                        )
                                    }
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-(--parisian-stone-dark) hover:bg-black/10 transition-colors font-bold text-lg cursor-pointer"
                                    aria-label="Aumenta quantità"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to cart button */}
                        <Button
                            onClick={
                                isAuthenticated
                                    ? handleAddToCart
                                    : () => navigate({ to: "/login" })
                            }
                            disabled={!item.inStock || added || isAdding}
                            variant="copper"
                            size="lg"
                            rounded="full"
                            className="w-full h-16 text-sm font-bold uppercase tracking-[0.2em] shadow-2xl shadow-(--burnished-copper)/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 relative overflow-hidden"
                        >
                            {added ? (
                                <span className="flex items-center justify-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 animate-bounce" />
                                    {t("shop.added")}
                                </span>
                            ) : isAdding ? (
                                <span className="flex items-center justify-center gap-3">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {t("shop.adding")}
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-3">
                                    {isAuthenticated ? (
                                        <>
                                            <ShoppingBag className="w-5 h-5" />
                                            {t("shop.addToCart")}
                                            <span className="font-mono font-black text-white/80">
                                                ·{" "}
                                                {(item.price * qty).toFixed(2)}€
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <User className="w-5 h-5" />
                                            {t("shop.loginToBuy")}
                                        </>
                                    )}
                                </span>
                            )}
                            <div className="absolute inset-0 bg-white/10 -translate-x-full hover:translate-x-0 transition-transform duration-500" />
                        </Button>

                        {/* Safe purchase note */}
                        <div className="flex items-center justify-center gap-2 text-[10px] text-(--parisian-stone) opacity-60 pt-1">
                            <Package className="w-3.5 h-3.5" />
                            <span className="uppercase tracking-widest font-bold">
                                {t("shop.safeNote")}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
