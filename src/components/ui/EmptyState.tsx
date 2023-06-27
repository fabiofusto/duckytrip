"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import Heading from "./Heading";
import Button from "./Button";
import styled from "styled-components";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  error?: boolean;
}

type EmptyStateStyledProps = { error: boolean };
const EmptyStateStyled = styled.div<EmptyStateStyledProps>`
  height: 60vh;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  color: ${(props) => (props.error ? "rgb(244 63 94);" : "var(--textColor);")};

  .button-wrapper {
    width: 12rem;
    margin-top: 1rem;
  }
`;

const EmptyState: FC<EmptyStateProps> = ({
  title = "No exact matches found",
  subtitle = "Try changing or removing some of your filters",
  showReset,
  error = false,
}) => {
  const router = useRouter();

  return (
    <EmptyStateStyled error={error}>
      <Heading title={title} subtitle={subtitle} center />
      {showReset && (
        <div className="button-wrapper">
          <Button
            label="Remove all filters"
            variant="outline"
            onClick={() => router.push("/")}
          />
        </div>
      )}
    </EmptyStateStyled>
  );
};

export default EmptyState;
