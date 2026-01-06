import { NonRetriableError } from "inngest";
import type { NodeExecutor } from "../../executions/types";
import ky, { type Options as KyOptions } from "ky";

type HttpRequstData = {
  endpoint?: string;
  method?: "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
  body?: string;
};

export const httpRequestExecutor: NodeExecutor<HttpRequstData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  if (!data.endpoint) {
    throw new NonRetriableError("HTTP Request node: No endpoint configured");
  }

  const result = await step.run("http-request", async () => {
    const endpoint = data.endpoint!;
    const method = data.method || "GET";

    const options: KyOptions = { method };
    if (["POST", "PUT", "PATCH"].includes(method)) {
      options.body = data.body;
    }
    const response = await ky(endpoint, options);
    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();
    return {
      ...context,
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    };
  });

  return result;
};
