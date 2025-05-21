import {
  type QueryClientConfig,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import SuperJSON from "superjson";

const transformer = SuperJSON;

export const TANSTACK_OPTIONS = (
  conf?: QueryClientConfig,
): QueryClientConfig => ({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
      ...conf?.defaultOptions?.queries,
    },
    mutations: {
      ...conf?.defaultOptions?.mutations,
    },
    dehydrate: {
      serializeData: transformer.serialize,
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      ...conf?.defaultOptions?.dehydrate,
    },
    hydrate: {
      deserializeData: transformer.deserialize,
      ...conf?.defaultOptions?.hydrate,
    },
    ...conf?.defaultOptions,
  },
  ...conf?.mutationCache,
  ...conf?.queryCache,
});
