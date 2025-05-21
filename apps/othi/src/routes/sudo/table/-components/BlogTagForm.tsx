import { useForm } from "@/components/form";
import { BlogTagSchemas } from "@repo/database/schema";
import { Button } from "@repo/ui/primitive/button";
import { toast } from "@repo/ui/primitive/sonner";
import { useRouter } from "@tanstack/react-router";
import { blogTagById, blogTagCRUD } from "../blog_tag/-blog_tag_server";

interface Props {
  defaultValues?: typeof BlogTagSchemas.create.infer;
  mode: "create" | "update";
  onSuccess?: (data: typeof BlogTagSchemas.create.infer) => void;
}

export function BlogTagForm({
  defaultValues = {
    code: "",
    label: "",
  },
  mode = "create",
  onSuccess,
}: Props) {
  const router = useRouter();
  const form = useForm({
    defaultValues,
    validators: {
      onChange: BlogTagSchemas[mode],
    },
    onSubmit: async ({ value, formApi }) => {
      console.log("form value", value);

      try {
        await blogTagCRUD[mode]({ data: value });

        toast.success(`blog tag ${mode}d`);
        formApi.reset();
        router.invalidate();
        if (onSuccess) onSuccess(value);
      } catch (e) {
        console.log(e);
        toast.error((e as { code: string }).code);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex gap-2">
        <form.AppField
          name="code"
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: async ({ value: code }) => {
              if ((await blogTagById({ data: { code } })) !== undefined)
                return "exists";
              return undefined;
            },
          }}
          children={(field) => (
            <field.Input autoComplete="off" labelText="Code" />
          )}
        />
        <form.AppField
          name="label"
          children={(field) => (
            <field.Input autoComplete="off" labelText="Label" />
          )}
        />

        <Button
          className="mt-6 capitalize"
          type="submit"
          disabled={form.state.isSubmitting}
        >
          {mode}
        </Button>
      </div>
    </form>
  );
}
