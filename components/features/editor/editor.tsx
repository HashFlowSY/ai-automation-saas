"use client";
import { useSuspenseWorkflow } from "@/hooks/use-workflows";
import { ErrorView, LoadingView } from "../entity-components";

export const EditorLoading = () => {
  return <LoadingView message="Loading editor..." />;
};

export const EditorError = () => {
  return <ErrorView message="Error loading editor" />;
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);

  return <p>{JSON.stringify(workflow)}</p>;
};
