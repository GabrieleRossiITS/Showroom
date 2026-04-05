import { GlobalLoader } from "#/components/GlobalLoader";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const CherryPetals = () => {
    const [petals, setPetals] = useState<number[]>([]);

    useEffect(() => {
        setPetals(Array.from({ length: 30 }, (_, i) => i));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {petals.map((id) => (
                <motion.div
                    key={id}
                    className="absolute opacity-60 pointer-events-none"
                    style={{
                        backgroundColor: "#FFB7C5",
                        width: Math.random() * 12 + 6 + "px",
                        height: Math.random() * 12 + 6 + "px",
                        borderRadius: "100% 0 100% 100%",
                        top: -30,
                        left: Math.random() * 100 + "vw",
                    }}
                    animate={{
                        y: ["0vh", "105vh"],
                        x: [
                            "0vw",
                            `${Math.random() * 20 - 10}vw`,
                            `${Math.random() * 20 - 10}vw`,
                        ],
                        rotate: [0, Math.random() * 360, Math.random() * 720],
                    }}
                    transition={{
                        duration: Math.random() * 6 + 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </div>
    );
};

export const Route = createFileRoute("/about")({
    component: About,
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    staticData: {
        title: "L'Agenzia",
        breadcrumb: "nav.about",
    },
});

function About() {
    const { t, i18n } = useTranslation();

    return (
        <>
            {i18n.language === "ja" && <CherryPetals />}
            <div className="fixed inset-0 pointer-events-none z-0 bg-(--vintage-sepia)" />

            <div className="relative z-10 flex flex-col px-6 md:px-12 pt-32 pb-32 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-(--deep-charcoal) mb-12 font-serif drop-shadow-sm">
                        {t("about.title")}
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        <div className="space-y-10">
                            <div>
                                <h2 className="text-2xl font-bold text-(--burnished-copper-deep) mb-6">
                                    {t("about.agencyInfo", "About Us")}
                                </h2>

                                <div className="space-y-6">
                                    <div className="border-l-2 border-(--burnished-copper) pl-4">
                                        <p className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest mb-1">
                                            {t(
                                                "about.missionTitle",
                                                "Our Mission",
                                            )}
                                        </p>
                                        <p className="text-lg text-(--deep-charcoal) font-medium">
                                            {t(
                                                "about.missionValue",
                                                "Digitizing art, preserving emotion.",
                                            )}
                                        </p>
                                    </div>

                                    <div className="border-l-2 border-(--burnished-copper) pl-4">
                                        <p className="text-sm font-mono text-(--parisian-stone-dark) uppercase tracking-widest mb-1">
                                            {t("about.hqTitle", "Headquarters")}
                                        </p>
                                        <p className="text-lg text-(--deep-charcoal) font-medium">
                                            {t(
                                                "about.hqValue",
                                                "Milan / Paris",
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-stone">
                                <p className="text-(--parisian-stone-dark) leading-relaxed">
                                    {t(
                                        "about.agencyDescription",
                                        "PyTech Exhibitions is a cutting-edge agency specialized in creating and managing interactive digital art exhibitions. We combine advanced software engineering skills with deep curatorial sensitivity to transform historical archives and physical collections into immersive experiences accessible worldwide.",
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="bg-(--surface-strong) p-8 md:p-10 border border-(--line) rounded-xl shadow-sm backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-(--deep-charcoal) mb-6">
                                {t("about.contactUs", "Collaborate with us")}
                            </h2>
                            <form
                                className="space-y-6"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="name"
                                            className="text-sm font-medium text-(--parisian-stone-dark)"
                                        >
                                            {t(
                                                "about.formName",
                                                "Name or Company",
                                            )}
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full bg-(--bg-base) border border-border rounded-md px-4 py-3 text-(--deep-charcoal) focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                            placeholder={t("about.formNamePlaceholder", "e.g. Louvre Museum")}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="email"
                                            className="text-sm font-medium text-(--parisian-stone-dark)"
                                        >
                                            {t("about.formEmail", "Email")}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full bg-(--bg-base) border border-border rounded-md px-4 py-3 text-(--deep-charcoal) focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                            placeholder="info@museo.fr"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="subject"
                                        className="text-sm font-medium text-(--parisian-stone-dark)"
                                    >
                                        {t(
                                            "about.formSubject",
                                            "Reason for contact",
                                        )}
                                    </label>
                                    <select
                                        id="subject"
                                        className="w-full bg-(--bg-base) border border-border rounded-md px-4 py-3 text-(--deep-charcoal) focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    >
                                        <option>
                                            {t(
                                                "about.subject1",
                                                "Exhibition organization request",
                                            )}
                                        </option>
                                        <option>
                                            {t(
                                                "about.subject2",
                                                "Technical / Software partnership",
                                            )}
                                        </option>
                                        <option>
                                            {t(
                                                "about.subject3",
                                                "General information",
                                            )}
                                        </option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="message"
                                        className="text-sm font-medium text-(--parisian-stone-dark)"
                                    >
                                        {t(
                                            "about.formMessage",
                                            "How can we help you?",
                                        )}
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full bg-(--bg-base) border border-border rounded-md px-4 py-3 text-(--deep-charcoal) focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                                        placeholder={t(
                                            "about.formPlaceholder",
                                            "Write the details of your project here...",
                                        )}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-(--burnished-copper) hover:bg-(--burnished-copper-deep) text-(--vintage-sepia-light) font-bold py-4 rounded-md transition-colors duration-300 shadow-md"
                                >
                                    {t("about.formSubmit", "Send Request")}
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
