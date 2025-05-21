import { useTable } from "@repo/lib/hooks";
import { DataTable } from "@repo/ui/shared/table/DataTable";
import { createFileRoute } from "@tanstack/react-router";
import { BlogTagForm } from "../-components/BlogTagForm";
import { blogTagList } from "./-blog_tag_server";
import { blogTagsColumns } from "./-columns";

export const Route = createFileRoute("/sudo/table/blog_tag/")({
  component: RouteComponent,
  loader: async () => await blogTagList(),
});

function RouteComponent() {
  const blogTags = Route.useLoaderData();
  const { table } = useTable({
    data: blogTags,
    columns: blogTagsColumns,
  });

  return (
    <div>
      <BlogTagForm mode="create" />
      <DataTable table={table} />
    </div>
  );
}
