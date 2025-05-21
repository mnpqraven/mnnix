import { Input } from "@repo/ui/primitive/input";
import { Label } from "@repo/ui/primitive/label";
import { type ComponentPropsWithRef, useId } from "react";
import { useFieldContext } from ".";

interface Props
  extends Omit<
    ComponentPropsWithRef<typeof Input>,
    "id" | "value" | "onChange"
  > {
  labelText?: string;
}

export function FormInput({ labelText, ...props }: Props) {
  const { state, handleChange, handleBlur } = useFieldContext<string>();
  const id = useId();
  const { meta } = state;
  const showErrorCond =
    (!meta.isValid || !meta.isDefaultValue) && meta.errors.length;

  return (
    <div className="space-y-2">
      {labelText?.length ? <Label htmlFor={id}>{labelText}</Label> : null}
      <Input
        id={id}
        value={state.value}
        onBlur={handleBlur}
        onChange={(e) => handleChange(e.target.value)}
        {...props}
      />
      {showErrorCond ? (
        <span className="text-destructive">{meta.errors.join(", ")}</span>
      ) : null}
    </div>
  );
}
