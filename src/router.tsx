import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { GlobalLoader } from './components/GlobalLoader'

export function getRouter() {
    const router = createTanStackRouter({
        routeTree,
        scrollRestoration: true,
        defaultPendingComponent: GlobalLoader,
        defaultPreload: 'intent',
        defaultPreloadStaleTime: 0,
    })

    return router
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof getRouter>
    }

    interface StaticDataRouteOption {
        title?: string
    }
}