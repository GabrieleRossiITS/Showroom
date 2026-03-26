import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/artworks/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/artworks/$id"!</div>
}
