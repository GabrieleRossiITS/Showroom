import React, { useEffect, useState, useMemo } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import {
    CreditCard,
    Lock,
    ArrowLeft,
    ShieldCheck,
    Loader2,
} from "lucide-react";
import type { TFunction } from "i18next";

type Props = {
    t: TFunction<"translation", undefined>;
};

export default function CartCheckout({ t }: Props) {
    const navigate = useNavigate();
    const { cart, checkout } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 16) val = val.slice(0, 16);
        const formatted = val.replace(/(\d{4})/g, "$1 ").trim();
        setCardNumber(formatted);
        if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: "" }));
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 4) val = val.slice(0, 4);
        if (val.length >= 2) {
            val = `${val.slice(0, 2)} / ${val.slice(2)}`;
        }
        setExpiry(val);
        if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: "" }));
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 4) val = val.slice(0, 4);
        setCvv(val);
        if (errors.cvv) setErrors((prev) => ({ ...prev, cvv: "" }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const cleanedCard = cardNumber.replace(/\D/g, "");

        if (!cleanedCard) {
            newErrors.cardNumber = t("checkout.errors.required");
        } else {
            let sum = 0;
            let shouldDouble = false;
            for (let i = cleanedCard.length - 1; i >= 0; i--) {
                let digit = parseInt(cleanedCard.charAt(i));
                if (shouldDouble) {
                    if ((digit *= 2) > 9) digit -= 9;
                }
                sum += digit;
                shouldDouble = !shouldDouble;
            }
            const isValidLuhn = sum % 10 === 0;

            if (cleanedCard.length !== 16 || !isValidLuhn) {
                newErrors.cardNumber = t("checkout.errors.invalidCard", "Numero carta non valido");
            }
        }

        const expiryClean = expiry.replace(/\s/g, "");
        if (!expiryClean) {
            newErrors.expiry = t("checkout.errors.required");
        } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryClean)) {
            newErrors.expiry = t("checkout.errors.invalidExpiry");
        } else {
            const [month, year] = expiryClean.split("/");
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                newErrors.expiry = t("checkout.errors.expiredCard");
            }
        }

        if (!cvv) {
            newErrors.cvv = t("checkout.errors.required");
        } else if (!/^\d{3,4}$/.test(cvv)) {
            newErrors.cvv = t("checkout.errors.invalidCvv");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (!isProcessing && !isSuccess && (!cart || cart.items.length === 0)) {
            navigate({ to: "/shop" });
        }
    }, [cart, navigate, isProcessing, isSuccess]);

    const totalAmount = useMemo(() => {
        return (
            cart?.items.reduce(
                (acc, item) => acc + item.souvenirPrice * item.quantity,
                0,
            ) || 0
        );
    }, [cart]);

    const handleConfirmPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsProcessing(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // Prevent immediate auto-redirect to /shop when context resets cart
            setIsSuccess(true);
            await checkout(true);
            navigate({
                to: "/order-success",
                state: { cartData: cart, totalAmount }
            });
        } catch (error) {
            console.error("Payment failed:", error);
            setIsSuccess(false);
        } finally {
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
                        onClick={() => navigate({ to: "/cart" })}
                        className="group gap-2 text-(--parisian-stone-dark) bg-white/20 rounded-full px-6"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        {t("checkout.backToCart")}
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

                        <form
                            onSubmit={handleConfirmPayment}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className={`text-[10px] font-mono uppercase tracking-[0.2em] ml-1 ${errors.cardNumber ? 'text-red-500' : 'text-(--parisian-stone)'}`}>
                                    {t("checkout.cardNumber")}
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    placeholder="0000 0000 0000 0000"
                                    className={`w-full h-14 px-6 rounded-2xl bg-white/50 border focus:outline-none transition-colors font-mono tracking-widest ${errors.cardNumber ? 'border-red-500 focus:border-red-500' : 'border-black/5 focus:border-(--burnished-copper)'}`}
                                />
                                {errors.cardNumber && <p className="text-xs text-red-500 ml-1">{errors.cardNumber}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className={`text-[10px] font-mono uppercase tracking-[0.2em] ml-1 ${errors.expiry ? 'text-red-500' : 'text-(--parisian-stone)'}`}>
                                        {t("checkout.expiry")}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={expiry}
                                        onChange={handleExpiryChange}
                                        placeholder="MM / YY"
                                        className={`w-full h-14 px-6 rounded-2xl bg-white/50 border focus:outline-none transition-colors font-mono tracking-widest ${errors.expiry ? 'border-red-500 focus:border-red-500' : 'border-black/5 focus:border-(--burnished-copper)'}`}
                                    />
                                    {errors.expiry && <p className="text-xs text-red-500 ml-1">{errors.expiry}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] font-mono uppercase tracking-[0.2em] ml-1 ${errors.cvv ? 'text-red-500' : 'text-(--parisian-stone)'}`}>
                                        {t("checkout.cvv")}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={cvv}
                                        onChange={handleCvvChange}
                                        placeholder="000"
                                        className={`w-full h-14 px-6 rounded-2xl bg-white/50 border focus:outline-none transition-colors font-mono tracking-widest ${errors.cvv ? 'border-red-500 focus:border-red-500' : 'border-black/5 focus:border-(--burnished-copper)'}`}
                                    />
                                    {errors.cvv && <p className="text-xs text-red-500 ml-1">{errors.cvv}</p>}
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
                                        {t("checkout.payNow")}{" "}
                                        {totalAmount.toFixed(2)}€
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
                                {t("checkout.orderItems")}
                            </h3>
                            <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                {cart?.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center gap-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-bold text-(--deep-charcoal) line-clamp-1">
                                                    {item.souvenirName}
                                                </p>
                                                <p className="text-[10px] text-(--parisian-stone)">
                                                    qty: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-mono font-bold text-(--parisian-stone-dark)">
                                            {(
                                                item.souvenirPrice *
                                                item.quantity
                                            ).toFixed(2)}
                                            €
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-black/5 pt-4 space-y-2">
                                <div className="flex justify-between text-sm opacity-60">
                                    <span>{t("checkout.subtotal")}</span>
                                    <span className="font-mono">
                                        {totalAmount.toFixed(2)}€
                                    </span>
                                </div>
                                <div className="flex justify-between text-lg font-black text-(--burnished-copper)">
                                    <span>{t("checkout.total")}</span>
                                    <span className="font-mono">
                                        {totalAmount.toFixed(2)}€
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
            `}</style>
        </div>
    );
}
