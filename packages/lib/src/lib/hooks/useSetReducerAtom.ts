import { useSetAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { useCallback } from "react";

export function useSetReducerAtom<Value, Action>(
  anAtom: PrimitiveAtom<Value>,
  reducer: (v: Value, a: Action) => Value,
) {
  const setState = useSetAtom(anAtom);
  const dispatch = useCallback(
    (action: Action) => {
      setState((prev) => reducer(prev, action));
    },
    [setState, reducer],
  );
  return dispatch;
}
