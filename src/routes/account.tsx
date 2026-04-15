import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShoppingBag, Ticket, Lock, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { GlobalLoader } from "#/components/GlobalLoader";
import Button from "#/components/ui/Button";
import { useAuth } from "#/components/contexts/AuthContext";
import ProfileTab from "#/components/layout/Account/ProfileTab";
import OrdersTab from "#/components/layout/Account/OrdersTab";
import TicketsTab from "#/components/layout/Account/TicketsTab";
import SecurityTab from "#/components/layout/Account/SecurityTab";
import { getUserById, getUserOrders, getUserTickets } from "#/api/fetchers";
import type { Order, Ticket as TicketType } from "#/types";

export const Route = createFileRoute("/account")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    loader: async ({ context }) => {
        const lang = context.lang.split("-")[0];
        const saved =
            typeof window !== "undefined"
                ? localStorage.getItem("showroom_user")
                : null;
        const storedUser = saved ? JSON.parse(saved) : null;
        const userId: number | null = storedUser?.id
            ? Number(storedUser.id)
            : null;

        if (!userId) return { profile: null, orders: [], tickets: [], lang };

        const [profile, orders, tickets] = await Promise.all([
            getUserById(userId).catch(() => null),
            getUserOrders(userId, lang).catch(() => [] as Order[]),
            getUserTickets(userId, lang).catch(() => [] as TicketType[]),
        ]);

        return { profile, orders, tickets, lang };
    },
    component: AccountPage,
    staticData: {
        title: "nav.account",
    },
});

type Tab = "profile" | "orders" | "tickets" | "security";

function AccountPage() {
    const { profile, orders, tickets } = Route.useLoaderData();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<Tab>("profile");

    const handleLogout = async () => {
        await logout();
        navigate({ to: "/" });
    };

    // If not logged in, redirect
    if (!user && !profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-(--vintage-sepia) px-6">
                <p className="text-2xl font-serif italic text-(--parisian-stone-dark)">
                    {t("account.loginRequired")}
                </p>
                <Button
                    variant="copper"
                    rounded="full"
                    size="lg"
                    onClick={() => navigate({ to: "/login" })}
                >
                    {t("nav.login")}
                </Button>
            </div>
        );
    }

    const displayName = profile
        ? `${profile.firstName} ${profile.lastName}`
        : user
          ? `${user.firstName} ${user.lastName}`.trim() || user.email
          : "Utente";

    const displayEmail = profile?.email ?? user?.email ?? "";

    const tabs: {
        id: Tab;
        label: string;
        icon: React.ReactNode;
        count?: number;
    }[] = [
        {
            id: "profile",
            label: t("account.profile"),
            icon: <User className="w-4 h-4" />,
        },
        {
            id: "orders",
            label: t("account.orders"),
            icon: <ShoppingBag className="w-4 h-4" />,
            count: orders.length,
        },
        {
            id: "tickets",
            label: t("account.tickets"),
            icon: <Ticket className="w-4 h-4" />,
            count: tickets.length,
        },
        {
            id: "security",
            label: t("account.security"),
            icon: <Lock className="w-4 h-4" />,
        },
    ];

    return (
        <div className="min-h-screen bg-(--vintage-sepia) pt-36 pb-24 px-6 md:px-12">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                >
                    <div>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--burnished-copper)/10 border border-(--burnished-copper)/20 text-(--burnished-copper-deep) text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                            <User className="w-3 h-3" />
                            {t("account.myAccount")}
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black text-(--deep-charcoal) font-serif italic tracking-tight leading-none">
                            {displayName}
                        </h1>
                        <p className="text-(--parisian-stone-dark) mt-2 font-medium opacity-70">
                            {displayEmail}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        rounded="full"
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 border border-red-500/20 self-start md:self-auto"
                    >
                        <LogOut className="w-4 h-4" />
                        {t("nav.logout")}
                    </Button>
                </motion.div>

                {/* ── Tabs ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-wrap gap-2"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={[
                                "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all duration-300",
                                activeTab === tab.id
                                    ? "bg-(--deep-charcoal) text-(--vintage-sepia-light) shadow-lg"
                                    : "bg-white/40 text-(--parisian-stone-dark) hover:bg-white/60 border border-white/60",
                            ].join(" ")}
                        >
                            {tab.icon}
                            {tab.label}
                            {tab.count !== undefined && tab.count > 0 && (
                                <span className="ml-1 px-2 py-0.5 rounded-full bg-(--burnished-copper)/20 text-(--burnished-copper-deep) text-[10px] font-black">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* ── Tab Content ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === "profile" && (
                            <ProfileTab
                                profile={profile}
                                displayEmail={displayEmail}
                                displayName={displayName}
                            />
                        )}
                        {activeTab === "orders" && (
                            <OrdersTab orders={orders} />
                        )}
                        {activeTab === "tickets" && (
                            <TicketsTab tickets={tickets} />
                        )}
                        {activeTab === "security" && (
                            <SecurityTab email={displayEmail} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
