import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Button from "#/components/ui/Button";
import { MoveLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GlobalLoader } from "#/components/GlobalLoader";

export const Route = createFileRoute("/artist")({
    component: Artist,
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    staticData: {
        title: "L'Artista - Robert Doisneau",
        breadcrumb: "nav.artist",
    },
});

function Artist() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
    };

    return (
        <main className="page-wrap px-6 md:px-12 relative min-h-screen pb-32">
            <div
                aria-hidden="true"
                className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-(--burnished-copper)/5 blur-[120px] pointer-events-none z-0"
            />
            <div
                aria-hidden="true"
                className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-(--parisian-stone)/5 blur-[120px] pointer-events-none z-0"
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto pt-24 lg:pt-32">
                <div className="mb-12">
                    <Button
                        onClick={() => navigate({ to: "/" })}
                        variant="outline"
                        size="sm"
                        className="gap-2 text-(--parisian-stone-dark) hover:text-(--deep-charcoal)"
                    >
                        <MoveLeft className="w-4 h-4" />
                        {t("artist.backHome")}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-12 lg:gap-20 items-start">
                    <div className="lg:sticky lg:top-32 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative group aspect-square lg:aspect-4/5 w-full rounded-[3rem] bg-(--vintage-sepia-light)/40 backdrop-blur-3xl border border-(--line) shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center"
                        >
                            <div
                                className="absolute inset-0 rounded-[3rem] border border-white/40 pointer-events-none mix-blend-overlay"
                                aria-hidden="true"
                            />

                            <div
                                className="relative w-48 h-48 mb-12"
                                aria-hidden="true"
                            >
                                <div className="absolute inset-0 border-4 border-dashed border-(--burnished-copper)/20 rounded-full animate-[spin_20s_linear_infinite]" />
                                <div className="absolute inset-4 border-2 border-solid border-(--deep-charcoal)/10 rounded-full animate-[spin_10s_linear_infinite_reverse] flex items-center justify-center bg-white/5 backdrop-blur-sm">
                                    <div className="text-3xl font-serif italic text-(--deep-charcoal) opacity-40">
                                        RD
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-mono uppercase tracking-[0.4em] text-(--burnished-copper) font-bold animate-pulse">
                                        Loading 3D
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-3xl font-serif font-bold text-(--deep-charcoal) mb-4">
                                {t("artist.interactiveTitle")}
                            </h3>
                            <p className="text-(--parisian-stone-dark) text-sm max-w-xs leading-relaxed">
                                {t("artist.interactiveDesc")}
                            </p>

                            <div className="mt-8 flex gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="w-1.5 h-1.5 rounded-full bg-(--burnished-copper)/30"
                                    />
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            {...fadeIn}
                            className="p-8 rounded-4xl bg-(--deep-charcoal) text-(--vintage-sepia) shadow-xl"
                        >
                            <h4 className="text-xs font-mono uppercase tracking-[0.3em] mb-4 opacity-70">
                                {t("artist.bioSummary")}
                            </h4>
                            <div className="space-y-4 text-sm font-medium">
                                <div className="flex justify-between border-b border-white/10 pb-2 gap-4">
                                    <span className="opacity-60 shrink-0">
                                        {t("artist.life")}
                                    </span>
                                    <span className="text-right">
                                        {t("artist.lifeValue")}
                                    </span>
                                </div>

                                <div className="flex justify-between border-b border-white/10 pb-2 gap-4">
                                    <span className="opacity-60 shrink-0">
                                        {t("artist.nationality")}
                                    </span>
                                    <span className="text-right">
                                        {t("artist.nationalityValue")}
                                    </span>
                                </div>

                                <div className="flex justify-between border-b border-white/10 pb-2 gap-4">
                                    <span className="opacity-60 shrink-0">
                                        {t("artist.movement")}
                                    </span>
                                    <span className="text-right">
                                        {t("artist.movementValue")}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="opacity-60 shrink-0">
                                        {t("artist.famousWork")}
                                    </span>
                                    <span className="text-right">
                                        {t("artist.famousWorkValue")}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            {...fadeIn}
                            className="p-8 rounded-4xl bg-(--deep-charcoal) text-(--vintage-sepia) shadow-xl"
                        >
                            <h4 className="text-xs font-mono uppercase tracking-[0.3em] mb-4 opacity-70">
                                {t("artist.techDetails")}
                            </h4>
                            <div className="space-y-4 text-sm font-medium">
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="opacity-60">
                                        {t("artist.activity")}
                                    </span>
                                    <span>1930 - 1994</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="opacity-60">
                                        {t("artist.style")}
                                    </span>
                                    <span>{t("artist.styleValue")}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-60">
                                        {t("artist.subject")}
                                    </span>
                                    <span>{t("artist.subjectValue")}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="space-y-12 lg:space-y-20">
                        <motion.section
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-(--vintage-sepia-light)/60 backdrop-blur-xl p-10 md:p-16 rounded-[4rem] border border-(--line) shadow-sm"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-(--burnished-copper)/10 text-(--burnished-copper-deep) text-xs font-bold uppercase tracking-[0.2em] mb-8">
                                {t("artist.humanistTag")}
                            </span>
                            <h1 className="text-6xl md:text-8xl font-serif font-bold text-(--deep-charcoal) mb-10 leading-none tracking-tight">
                                Robert <br />
                                <span className="text-(--burnished-copper)">
                                    Doisneau
                                </span>
                            </h1>
                            <p className="text-2xl md:text-3xl text-(--parisian-stone-dark) leading-relaxed font-serif italic opacity-90">
                                {t("artist.quote")}
                            </p>
                        </motion.section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            <motion.section
                                {...fadeIn}
                                className="p-10 rounded-[3rem] bg-white/40 backdrop-blur-md border border-(--line) hover:bg-white/60 transition-colors duration-500"
                            >
                                <h2 className="text-3xl font-serif font-bold text-(--deep-charcoal) mb-6 flex items-baseline gap-4">
                                    <span className="text-4xl text-(--burnished-copper)/40">
                                        01
                                    </span>
                                    {t("artist.originsTitle")}
                                </h2>
                                <p className="text-(--parisian-stone-dark) leading-relaxed text-lg mb-6">
                                    {t("artist.originsP1")}
                                </p>
                                <p className="text-(--parisian-stone-dark) leading-relaxed text-lg">
                                    {t("artist.originsP2")}
                                </p>
                            </motion.section>

                            <motion.section
                                {...fadeIn}
                                className="p-10 rounded-[3rem] bg-white/40 backdrop-blur-md border border-(--line) hover:bg-white/60 transition-colors duration-500"
                            >
                                <h2 className="text-3xl font-serif font-bold text-(--deep-charcoal) mb-6 flex items-baseline gap-4">
                                    <span className="text-4xl text-(--burnished-copper)/40">
                                        02
                                    </span>
                                    {t("artist.renaultTitle")}
                                </h2>
                                <p className="text-(--parisian-stone-dark) leading-relaxed text-lg mb-6">
                                    {t("artist.renaultP1")}
                                </p>
                                <p className="text-(--parisian-stone-dark) leading-relaxed text-lg">
                                    {t("artist.renaultP2")}
                                </p>
                            </motion.section>
                        </div>

                        <motion.section
                            {...fadeIn}
                            className="rounded-[4rem] p-12 md:p-20 bg-(--deep-charcoal) text-(--vintage-sepia) relative overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-96 h-96 bg-(--burnished-copper)/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-10 relative z-10">
                                {t("artist.resistanceTitle")}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 opacity-80">
                                <p className="text-lg leading-relaxed">
                                    {t("artist.resistanceP1")}
                                </p>
                                <p className="text-lg leading-relaxed">
                                    {t("artist.resistanceP2")}
                                </p>
                            </div>
                        </motion.section>

                        <motion.section
                            {...fadeIn}
                            className="bg-(--vintage-sepia-light)/40 backdrop-blur-xl p-12 md:p-20 rounded-[4rem] border border-(--line)"
                        >
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-(--deep-charcoal) mb-12">
                                {t("artist.philosophyTitle")}
                            </h2>
                            <div className="grid grid-cols-1 gap-12">
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-serif font-bold text-(--burnished-copper-deep)">
                                        {t("artist.graceTitle")}
                                    </h3>
                                    <p className="text-xl text-(--parisian-stone-dark) leading-relaxed opacity-90">
                                        {t("artist.graceDesc")}
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section
                            {...fadeIn}
                            className="backdrop-blur-2xl rounded-[4rem] overflow-hidden group shadow-2xl"
                        >
                            <div className="inset-0 bg-(--burnished-copper) p-1 pr-1.5 pb-1.5 rounded-[4rem]">
                                <div className="w-full h-full bg-white/10 backdrop-blur-3xl rounded-[3.8rem] p-12 md:p-20">
                                    <h2 className="text-4xl font-serif font-bold text-(--deep-charcoal) mb-8">
                                        {t("artist.iconTitle")}
                                    </h2>
                                    <p className="text-(--parisian-stone-dark) text-lg leading-relaxed mb-10">
                                        {t("artist.iconDesc")}
                                    </p>
                                    <div className="inline-flex items-center gap-4 text-(--burnished-copper-deep) font-serif italic text-xl">
                                        <div className="w-12 h-px bg-(--burnished-copper)" />
                                        Hôtel de Ville, 1950
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section
                            {...fadeIn}
                            className="p-10 md:p-14 bg-white/30 backdrop-blur-2xl border border-white/50 rounded-[4rem] shadow-sm"
                        >
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-(--deep-charcoal) mb-8">
                                {t("artist.legacyTitle")}
                            </h2>
                            <p className="text-(--parisian-stone-dark) leading-relaxed text-lg mb-6">
                                {t("artist.legacyP1")}
                            </p>
                            <p className="text-(--parisian-stone-dark) leading-relaxed text-lg">
                                {t("artist.legacyP2")}
                            </p>
                        </motion.section>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Artist;
