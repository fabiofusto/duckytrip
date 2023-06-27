"use client";

import { FC, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IconType } from "react-icons";
import styled from "styled-components";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}
type BoxProps = { option?: string };
const Box = styled.div<BoxProps>`
  gap: 0.5rem;
  padding: 1rem 0.75rem 0.5rem 0.75rem;
  border-bottom-width: 2px;
  cursor: pointer;
  color: var(--textColor);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: all 150ms;

  &:hover {
    color: var(--iconSecondaryHoverColor);
  }

  border-bottom-color: ${(props) =>
    props.option === "true"
      ? "var(--iconSecondaryHoverColor);"
      : "transparent"};
  color: ${(props) =>
    props.option === "true"
      ? "var(--iconSecondaryHoverColor);"
      : "var(--iconSecondaryColor)"};

  .label {
    font-weight: 600;
  }
`;

const CategoryBox: FC<CategoryBoxProps> = ({ label, icon: Icon, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <Box option={selected!.toString()} onClick={handleClick}>
      <Icon size={26} />
      <div className="label">{label}</div>
    </Box>
  );
};

export default CategoryBox;
