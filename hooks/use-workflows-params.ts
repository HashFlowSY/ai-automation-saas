import { useQueryStates } from "nuqs";
import { workflowsParams } from "@/app/api/workflows/params";

export const useWorkflowsParams = () => {
  return useQueryStates(workflowsParams);
};
