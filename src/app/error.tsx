"use client";

import EmptyState from "@/components/ui/EmptyState";
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

import { FC } from "react";

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Ops! Something went wrong."
      subtitle="Try refreshing your page"
      error
    />
  );
};

export default ErrorState;
