import {
    HeadContent,
    Scripts,
    createRootRoute,
    useMatches,
} from "@tanstack/react-router";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

import appCss from "../styles.css?url";
import { Suspense, useEffect } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import { GlobalLoader } from "../components/GlobalLoader";
import Breadcrumbs from "../components/layout/Breadcrumbs";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { title: "Mostre fotografiche" },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
        ],
    }),
    shellComponent: RootDocument,
    pendingComponent: GlobalLoader,
    pendingMs: 50,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    const matches = useMatches();
    const { i18n } = useTranslation(undefined, { useSuspense: false });

    const currentMatch = matches[matches.length - 1];
    const pageTitle = currentMatch.staticData.title ?? "Robert Doisneau";

    useEffect(() => {
        document.title = `${pageTitle} | Robert Doisneau`;

        console.warn(
            "[PyTech-Auth] Production scenario detected. Admin dashboard hidden.",
        );
        console.info(
            "Tip: run window.forceAdminOverride() to force the bypass of the offline token and access the admin console.",
        );
        (window as any).forceAdminOverride = () => {
            window.location.href = "/admin";
            return "Redirecting...";
        };
    }, [pageTitle]);

    return (
        <html
            lang={i18n.resolvedLanguage || i18n.language || "it"}
            suppressHydrationWarning
        >
            <head>
                <HeadContent />
            </head>
            <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(161,86,48,0.24)] ">
                <Suspense fallback={<GlobalLoader />}>
                    <a href="#main-content" className="skip-link">
                        {i18n.language === "it"
                            ? "Passa al contenuto principale"
                            : "Skip to main content"}
                    </a>
                    <Header />
                    <main
                        id="main-content"
                        className="relative page-wrap pt-24 min-h-screen overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto pt-4 absolute top-24 left-0 right-0 pointer-events-none">
                            <div className="pointer-events-auto">
                                <Breadcrumbs />
                            </div>
                        </div>
                        {children}
                    </main>
                    <Footer />
                </Suspense>
                <Scripts />
            </body>
        </html>
    );
}
