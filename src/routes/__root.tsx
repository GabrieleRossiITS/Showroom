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

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { title: "TanStack Start Starter" },
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
                        {i18n.language === "it" ? "Passa al contenuto principale" : "Skip to main content"}
                    </a>
                    <Header />
                    <main id="main-content" className="relative page-wrap pt-24 min-h-screen overflow-hidden">
                        {children}
                    </main>
                    <Footer />
                </Suspense>
                <Scripts />
            </body>
        </html>
    );
}
