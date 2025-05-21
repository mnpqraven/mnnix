import type { DescService } from "@bufbuild/protobuf";
import { createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";

const transport = createGrpcWebTransport({
  baseUrl: "http://127.0.0.1:5005",
});

export function rpcClient<T extends DescService>(service: T) {
  return createClient(service, transport);
}
