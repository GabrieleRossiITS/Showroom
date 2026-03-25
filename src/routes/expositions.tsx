import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expositions')({
    component: Expositions,
    staticData: {
        title: 'Mostre',
    },
})

function Expositions() {
    return (
        <main className="page-wrap px-4 py-12">
            <section className="island-shell rounded-2xl p-6 sm:p-8">
                <p className="island-kicker mb-2">Mostre</p>
                <h1 className="display-title mb-3 text-4xl font-bold text-(--deep-charcoal) sm:text-5xl">
                    Mostre
                </h1>
                <p className="m-0 max-w-3xl text-base leading-8 text-(--parisian-stone)">
                    Elenco delle mostre.
                </p>
            </section>
        </main>
    )
}
