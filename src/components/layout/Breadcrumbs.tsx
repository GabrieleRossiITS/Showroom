import { Link, useMatches, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
    const { t } = useTranslation();
    const matches = useMatches();
    const location = useLocation();

    const currentMatch = matches[matches.length - 1];
    const data = currentMatch.staticData as { breadcrumb?: string; title?: string } | undefined;
    const loaderData = currentMatch.loaderData as any;

    let currentLabel: string = currentMatch.routeId;
    if (data?.breadcrumb) {
        currentLabel = t(data.breadcrumb);
    } else if (data?.title) {
        currentLabel = t(data.title);
    }

    if (loaderData?.title) {
        currentLabel = loaderData.title;
    } else if (loaderData?.exhibition?.title) {
        currentLabel = loaderData.exhibition.title;
    }

    const pathSegments = location.pathname.split("/").filter(Boolean);

    const breadcrumbs = pathSegments.map((segment, index) => {
        const path = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;

        if (isLast) {
            return {
                label: currentLabel,
                path,
            };
        }

        let label = segment;
        const translationKey = `nav.${segment}`;
        const translated = t(translationKey);

        if (translated !== translationKey) {
            label = translated;
        } else {
            label = segment.charAt(0).toUpperCase() + segment.slice(1);
        }

        return {
            label,
            path,
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
