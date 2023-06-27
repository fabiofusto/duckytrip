"use client";

import useSearchModal from "@/hooks/modals/useSearchModal";
import useCountries from "@/hooks/useCountries";
import { mediaQueries } from "@/lib/styled-components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import styled from "styled-components";

type SearchProps = { option?: string };
const Wrapper = styled.div<SearchProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  .remove-filters {
    cursor: pointer;
    padding: 0.25rem;
    border-radius: var(--borderRadiusXl);
    background-color: var(--errorColor);
    color: var(--textColor);
    transition: all 150ms;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      scale: 1.1;
    }
  }

  .search-component {
    width: 100%;
    ${mediaQueries("md")("width: auto;")}

    padding: 0.25rem 0.25rem 0.25rem 0.75rem;

    cursor: pointer;
    transition: all 150ms;

    background-color: var(--backgroundColor);

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    &:hover {
      scale: 1.05;
    }

    &:hover > .search-label {
      color: white;
    }

    .search-label {
      display: none;
      ${mediaQueries("md")("display: block;")}
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 600;
      color: var(--textColor);

      border-bottom-width: 2px;
      border-bottom-color: ${(props) =>
        props.option === "true"
          ? "var(--iconSecondaryHoverColor);"
          : "transparent"};
    }

    .icon-wrapper {
      padding: 0.25rem;
      background-color: var(--iconColor);
      border-radius: var(--borderRadiusXl);
      color: var(--backgroundColor);
    }
  }
`;

const Search: FC = () => {
  const searchModal = useSearchModal();
  const router = useRouter();

  const params = useSearchParams();
  const pathname = usePathname();

  const isFiltering = useMemo(() => {
    const url = pathname + params.toString();
    if (url.includes("=")) return true;
    return false;
  }, [pathname, params]);

  const { getByValue } = useCountries();
  const locationValue = params?.get("locationValue");

  const locationLabel = useMemo(() => {
    if (locationValue) return getByValue(locationValue as string)?.label;
    return "Find a place";
  }, [locationValue, getByValue]);

  return (
    <Wrapper option={isFiltering.toString()}>
      <div onClick={searchModal.onOpen} className="search-component">
        <p className="search-label">{locationLabel}</p>
        <div className="icon-wrapper">
          <BiSearch size={20} />
        </div>
      </div>
      {isFiltering && (
        <div className="remove-filters" onClick={() => router.push("/")}>
          <MdOutlineCancel size={20} />
        </div>
      )}
    </Wrapper>
  );
};

export default Search;
