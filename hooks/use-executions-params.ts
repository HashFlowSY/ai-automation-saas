import { executionsParams } from "@/app/api/executions/params";
import { useQueryStates } from "nuqs";

export const useExecutionsParams = () => {
  return useQueryStates(executionsParams);
};
