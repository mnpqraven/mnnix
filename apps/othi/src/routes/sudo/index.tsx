import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sudo/")({
  component: RouteComponent,
});

function RouteComponent() {
  const tableNames = ["blog", "blog_tag"] as const;
  return (
    <div className="flex flex-col gap-2">
      SUDO page
      <span>Table blocks</span>
      <div className="flex flex-col gap-2">
        {tableNames.map((table) => (
          <Link className="border" key={table} to={`/sudo/table/${table}`}>
            {table}
          </Link>
        ))}
      </div>
    </div>
  );
}
