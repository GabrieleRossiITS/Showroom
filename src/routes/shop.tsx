import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { GlobalLoader } from "#/components/GlobalLoader";
import Button from "#/components/ui/Button";
import { getShopItems } from "public/api/fetchers";

export const Route = createFileRoute("/shop")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    loader: () => getShopItems(),
    component: ShopPage,
    staticData: {
        title: "Negozio",
        breadcrumb: "nav.shop",
    }
});

function ShopPage() {
    const items = Route.useLoaderData();
    const { t } = useTranslation();
    const [filter, setFilter] = useState<string>("all");
    const [purchasedId, setPurchasedId] = useState<number | null>(null);

    const categories = ["all", "print", "book", "postcard", "accessory"];

    const filteredItems = useMemo(() => {
        if (filter === "all") return items;
        return items.filter(item => item.category === filter);
    }, [items, filter]);

    const handleBuyNow = (id: number) => {
        setPurchasedId(id);
        setTimeout(() => setPurchasedId(null), 3000);
    };

    return (
        <div className="min-h-screen bg-(--vintage-sepia) pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-16">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-(--deep-charcoal) font-serif italic tracking-tight">
                        {t("shop.title")}
                    </h1>
                    <p className="text-xl text-(--parisian-stone-dark) max-w-2xl mx-auto font-medium opacity-80">
                        {t("shop.subtitle")}
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            rounded="full"
                            variant={filter === cat ? "copper" : "tertiary"}
                        >
                            {t(`shop.${cat}`)}
                        </Button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="
                                    group relative bg-(--deep-charcoal) p-4 rounded-[2.5rem] 
                                    overflow-hidden shadow-2xl hover:shadow-(--burnished-copper)/10 
                                    transition-all duration-500 hover:-translate-y-2
                                    "
                            >
                                <div className="relative aspect-4/5 overflow-hidden rounded-4xl bg-black/20">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="
                                            w-full h-full object-cover 
                                            transition-all duration-500 
                                            group-hover:scale-110 
                                            grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100
                                            "
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                            {t(`shop.${item.category}`)}
                                        </span>
                                    </div>

                                    <AnimatePresence>
                                        {purchasedId === item.id && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 bg-(--burnished-copper)/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-white px-8 text-center"
                                            >
                                                <CheckCircle2 className="w-16 h-16 mb-4 animate-bounce" />
                                                <span className="text-lg font-bold font-serif leading-tight">{t("shop.success")}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="text-xl font-bold text-(--vintage-sepia-light) font-serif leading-tight group-hover:text-white transition-colors">
                                            {item.title}
                                        </h3>
                                        <span className="text-2xl font-black text-(--burnished-copper) font-mono shrink-0">
                                            {item.price}€
                                        </span>
                                    </div>
                                    <p className="text-(--parisian-stone) text-sm line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {item.description}
                                    </p>
                                    <Button
                                        onClick={() => handleBuyNow(item.id)}
                                        variant="copper"
                                        rounded="full"
                                        className="w-full mt-4 flex gap-3 font-bold tracking-widest text-xs py-4 group/btn overflow-hidden relative"
                                    >
                                        <span className="relative z-10">{t("shop.buyNow")}</span>
                                        <ShoppingBag className="w-4 h-4 relative z-10 transition-transform group-hover/btn:rotate-12" />
                                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-[0%] transition-transform duration-500" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
