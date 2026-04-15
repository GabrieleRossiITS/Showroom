import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Tag, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback } from "react";
import { GlobalLoader } from "#/components/GlobalLoader";

import {
    getShopItems,
    getCategories,
    getCategorySouvenirs,
} from "#/api/fetchers";
import { ProtectedImage } from "#/components/ui/ProtectedImage";
import type { SouvenirsItem, Category } from "#/types";
import { t } from "i18next";

// ─── Loader: fetch all items + categories in parallel ────────────────────────

export const Route = createFileRoute("/shop/")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    loader: async ({ context }) => {
        const lang = context.lang.split("-")[0];
        const [items, categories] = await Promise.all([
            getShopItems(lang),
            getCategories().catch(() => [] as Category[]),
        ]);
        return { items, categories, lang };
    },
    component: ShopPage,
    staticData: {
        title: "nav.shop",
        breadcrumb: "nav.shop",
    },
});

// ─── Component ────────────────────────────────────────────────────────────────

function ShopPage() {
    const { items: allItems, categories, lang } = Route.useLoaderData();
    const { t } = useTranslation();

    const [activeCategoryId, setActiveCategoryId] = useState<number | "all">(
        "all",
    );
    const [displayedItems, setDisplayedItems] =
        useState<SouvenirsItem[]>(allItems);
    const [isFiltering, setIsFiltering] = useState(false);

    const handleCategoryClick = useCallback(
        async (catId: number | "all") => {
            if (catId === activeCategoryId) return;
            setActiveCategoryId(catId);
            setIsFiltering(true);

            try {
                if (catId === "all") {
                    setDisplayedItems(allItems);
                } else {
                    const filtered = await getCategorySouvenirs(catId, lang);
                    setDisplayedItems(filtered);
                }
            } catch {
                // fallback: client-side filter from cached allItems
                if (catId !== "all") {
                    const cat = categories.find((c) => c.id === catId);
                    setDisplayedItems(
                        cat
                            ? allItems.filter((i) =>
                                  i.category
                                      .toLowerCase()
                                      .includes(cat.name.toLowerCase()),
                              )
                            : allItems,
                    );
                } else {
                    setDisplayedItems(allItems);
                }
            } finally {
                setIsFiltering(false);
            }
        },
        [activeCategoryId, allItems, categories, lang],
    );

    return (
        <div className="min-h-screen bg-(--vintage-sepia) overflow-x-hidden mb-16">
            {/* ── Hero strip ─────────────────────────────────────────── */}
            <div className="relative pt-40 pb-24 px-6 md:px-16 overflow-hidden">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-(--burnished-copper)/8 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 left-[-5%] w-[40vw] h-[40vw] bg-(--parisian-stone)/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="space-y-6 max-w-2xl"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--burnished-copper)/10 border border-(--burnished-copper)/20 text-(--burnished-copper-deep) text-[10px] font-bold uppercase tracking-[0.3em]">
                            <ShoppingBag className="w-3 h-3" />
                            {t("shop.label")}
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-(--deep-charcoal) font-serif italic tracking-tight leading-[0.95]">
                            {t("shop.title")}
                        </h1>
                        <p className="text-lg text-(--parisian-stone-dark) font-medium opacity-75 leading-relaxed max-w-md">
                            {t(
                                "shop.subtitle",
                                "Oggetti curati che prolungano l'esperienza della mostra nella vita quotidiana.",
                            )}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── Category tabs ─────────────────────────────────────── */}
            <div className="sticky top-32 z-30 bg-(--vintage-sepia)/80 backdrop-blur-xl border-b border-black/5">
                <div className="max-w-7xl mx-auto px-6 md:px-16 py-6">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                        <CategoryTab
                            active={activeCategoryId === "all"}
                            onClick={() => handleCategoryClick("all")}
                            label={t("shop.all")}
                            icon={<Tag className="w-3.5 h-3.5" />}
                        />
                        {categories.map((cat) => (
                            <CategoryTab
                                key={cat.id}
                                active={activeCategoryId === cat.id}
                                onClick={() => handleCategoryClick(cat.id)}
                                label={cat.name}
                                icon={<Tag className="w-3.5 h-3.5" />}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Grid ──────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
                <AnimatePresence mode="wait">
                    {isFiltering ? (
                        <motion.div
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-[2.5rem] bg-(--deep-charcoal)/5 animate-pulse aspect-4/5"
                                />
                            ))}
                        </motion.div>
                    ) : displayedItems.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-32 gap-4 text-center"
                        >
                            <ShoppingBag className="w-12 h-12 text-(--parisian-stone)/40" />
                            <p className="text-(--parisian-stone-dark) font-serif text-xl opacity-60">
                                {t(
                                    "shop.empty",
                                    "Nessun articolo in questa categoria.",
                                )}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {displayedItems.map((item, i) => (
                                <ShopCard key={item.id} item={item} index={i} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function CategoryTab({
    active,
    onClick,
    label,
    icon,
}: {
    active: boolean;
    onClick: () => void;
    label: string;
    icon?: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={[
                "shrink-0 m-1 flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300",
                active
                    ? "bg-(--deep-charcoal) text-(--vintage-sepia-light) scale-[1.04]"
                    : "bg-black/5 text-(--parisian-stone-dark) hover:bg-black/10",
            ].join(" ")}
        >
            {icon}
            {label}
        </button>
    );
}

function ShopCard({ item, index }: { item: SouvenirsItem; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
        >
            <Link
                to="/shop/$id"
                params={{ id: String(item.id) }}
                className="group block bg-(--deep-charcoal) rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-(--burnished-copper)/10 transition-all duration-500 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-(--burnished-copper)/40"
            >
                {/* Image */}
                <div className="relative aspect-4/5 overflow-hidden bg-black/20">
                    <ProtectedImage
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Category badge */}
                    <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.25em] border border-white/10">
                        {item.category}
                    </span>
                    {/* Stock badge */}
                    {!item.inStock && (
                        <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-red-900/70 backdrop-blur-md text-red-300 text-[9px] font-black uppercase tracking-widest">
                            {t("shop.outOfStock")}
                        </span>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                            {t("shop.card.knowMore")}{" "}
                            <ChevronRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start gap-3">
                        <h3 className="text-lg font-bold text-(--vintage-sepia-light) font-serif leading-tight group-hover:text-white transition-colors line-clamp-2">
                            {item.name}
                        </h3>
                        <span className="text-2xl font-black text-(--burnished-copper) font-mono shrink-0">
                            {item.price}€
                        </span>
                    </div>
                    <p className="text-(--parisian-stone) text-sm line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">
                        {item.shortDescription}
                    </p>
                    {/* Stock indicator */}
                    {item.inStock &&
                        item.quantityAvailable <= 10 &&
                        item.quantityAvailable > 0 && (
                            <p className="text-[10px] font-bold uppercase tracking-widest text-(--burnished-copper)">
                                {t("shop.card.only")} {item.quantityAvailable}{" "}
                                {t("shop.card.remaining")}
                            </p>
                        )}
                </div>
            </Link>
        </motion.div>
    );
}
