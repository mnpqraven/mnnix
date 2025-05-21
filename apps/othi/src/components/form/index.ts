import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormInput as Input } from "./components";

export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

const { useAppForm: useForm } = createFormHook({
  fieldComponents: {
    Input,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useForm };
