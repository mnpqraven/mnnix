import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sudo/table/blog/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sudo/table/blog/"!</div>
}
