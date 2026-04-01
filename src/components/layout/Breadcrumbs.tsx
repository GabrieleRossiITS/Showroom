import { Link, useMatches } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
    const { t } = useTranslation();
    const matches = useMatches();

    const breadcrumbs = matches
        .filter((match) => match.pathname !== "/" && match.routeId !== "__root__")
        .map((match) => {
            const data = match.staticData as { breadcrumb?: string; title?: string };
            const loaderData = match.loaderData as any;

            let label = data.breadcrumb ? t(data.breadcrumb) : data.title || match.routeId;

            if (loaderData?.title) {
                label = loaderData.title;
            } else if (loaderData?.exhibition?.title) {
                label = loaderData.exhibition.title;
            }

            return {
                label,
                path: match.pathname,
            };
        });

    if (breadcrumbs.length === 0) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className="relative z-20 mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar"
        >
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
            >
                <Link
                    to="/"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-(--parisian-stone-dark) hover:text-(--burnished-copper) transition-colors"
                >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                </Link>

                {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.path} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-(--parisian-stone-dark)/40" />
                        <Link
                            to={crumb.path}
                            className={`text-xs font-bold uppercase tracking-widest transition-colors ${index === breadcrumbs.length - 1
                                ? "text-(--burnished-copper) pointer-events-none"
                                : "text-(--parisian-stone-dark) hover:text-(--burnished-copper)"
                                }`}
                        >
                            {crumb.label}
                        </Link>
                    </div>
                ))}
            </motion.div>
        </nav>
    );
}
