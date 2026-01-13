import { useQueryStates } from "nuqs";
import { credentialsParams } from "@/app/api/credentials/params";

export const useCredentialsParams = () => {
  return useQueryStates(credentialsParams);
};
