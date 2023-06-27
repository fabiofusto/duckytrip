"use client";

import { FC } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const Box = styled.div<{ selected?: boolean }>`
  border-radius: 0.75rem;
  border-width: 2px;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  cursor: pointer;
  transition: all 150ms;

  ${(props) =>
    props.selected
      ? "border-color: var(--textColor);"
      : "border-color: var(--borderColor)"};

  &:hover {
    border-color: var(--iconSecondaryHoverColor);
    .icon {
      color: var(--iconSecondaryHoverColor);
    }
    .label {
      color: var(--iconSecondaryHoverColor);
    }
  }

  .icon {
    color: var(--iconSecondaryColor);
    ${(props) => props.selected && "color: var(--textColor);"}
  }

  .label {
    font-weight: 600;
    color: var(--iconSecondaryColor);
    ${(props) => props.selected && "color: var(--textColor);"}
  }
`;

const CategoryInput: FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <Box selected={selected} onClick={() => onClick(label)}>
      <Icon className="icon" size={30} />
      <div className="label">{label}</div>
    </Box>
  );
};

export default CategoryInput;
