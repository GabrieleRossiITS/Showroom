import {
    HeadContent,
    Scripts,
    createRootRoute,
    useMatches,
} from '@tanstack/react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'

import appCss from '../styles.css?url'
import { useEffect } from 'react'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Start Starter',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
    shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
    const matches = useMatches()

    const currentMatch = matches[matches.length - 1]
    const pageTitle = currentMatch.staticData.title ?? 'Robert Doisneau'

    useEffect(() => {
        document.title = `${pageTitle} | Robert Doisneau`
    }, [pageTitle])

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(196,132,100,0.24)] ">
                <Header />
                <main className='page-wrap px-6 md:px-12 pt-24 min-h-screen overflow-hidden'>
                    {children}
                </main>
                <Footer />
                {/* <TanStackDevtools
                    config={{
                        position: 'bottom-right',
                    }}
                    plugins={[
                        {
                            name: 'Tanstack Router',
                            render: <TanStackRouterDevtoolsPanel />,
                        },
                    ]}
                /> */}
                <Scripts />
            </body>
        </html>
    )
}
