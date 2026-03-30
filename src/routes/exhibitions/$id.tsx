import { createFileRoute } from "@tanstack/react-router";
import { GlobalLoader } from "#/components/GlobalLoader";

export const Route = createFileRoute("/exhibitions/$id")({
    pendingComponent: GlobalLoader,
    pendingMs: 0,
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/exhibitions/$id"!</div>;
}
