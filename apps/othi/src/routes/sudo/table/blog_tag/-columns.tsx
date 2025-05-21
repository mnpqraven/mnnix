import type { BlogTagSchemas } from "@repo/database/schema";
import { Button } from "@repo/ui/primitive/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/primitive/dialog";
import { toast } from "@repo/ui/primitive/sonner";
import { ConfirmPopover } from "@repo/ui/shared/ConfirmPopover";
import { useRouter } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { Pen, Trash } from "lucide-react";
import { useState } from "react";
import { BlogTagForm } from "../-components/BlogTagForm";
import { blogTagDelete } from "./-blog_tag_server";

const col = createColumnHelper<typeof BlogTagSchemas.select.infer>();

export const blogTagsColumns = [
  col.accessor("id", {}),
  col.accessor("code", {}),
  col.accessor("label", {}),
  col.accessor("createdAt", {
    cell: ({ getValue }) => {
      const date = getValue();
      return date !== null ? new Date(date).toLocaleDateString() : null;
    },
  }),
  col.accessor("updatedAt", {
    cell: ({ getValue }) => {
      const date = getValue();
      return date !== null ? new Date(date).toLocaleDateString() : null;
    },
  }),
  col.display({
    id: "action",
    cell: function Action({ row }) {
      const router = useRouter();
      const [open, setOpen] = useState(false);

      return (
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline">
                <Pen className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update</DialogTitle>
                <DialogDescription>Update</DialogDescription>
              </DialogHeader>
              <BlogTagForm
                defaultValues={row.original}
                mode="update"
                onSuccess={() => {
                  setOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <ConfirmPopover
            asChild
            onConfirm={async () => {
              blogTagDelete({ data: { id: row.original.id } }).then(() => {
                toast.success("tag deleted");
                router.invalidate();
              });
            }}
          >
            <Button variant="outline" size="icon">
              <Trash className="size-4" />
            </Button>
          </ConfirmPopover>
        </div>
      );
    },
  }),
];
