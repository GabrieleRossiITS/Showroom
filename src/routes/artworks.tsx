import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/artworks')({
    component: RouteComponent,
    staticData: {
        title: 'Opere',
    },
})

function RouteComponent() {
    return (
        <div>Test</div>
    )
}
