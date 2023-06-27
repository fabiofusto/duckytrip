"use client";

import { mediaQueries } from "@/lib/styled-components";
import styled from "styled-components";

type GridLayoutProps = {
  marginTopXl?: boolean;
  marginTopMd?: boolean;
  marginTopSm?: boolean;
};
export const GridLayout = styled.div<GridLayoutProps>`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 2rem;

  margin-top: ${(props) => props.marginTopXl && "7rem"};
  margin-top: ${(props) => props.marginTopMd && "5rem"};
  margin-top: ${(props) => props.marginTopSm && "2rem"};

  ${mediaQueries("sm")("grid-template-columns: repeat(2, minmax(0, 1fr));")}
  ${mediaQueries("md")("grid-template-columns: repeat(2, minmax(0, 1fr));")}
  ${mediaQueries("lg")("grid-template-columns: repeat(2, minmax(0, 1fr));")}
  ${mediaQueries("xl")("grid-template-columns: repeat(3, minmax(0, 1fr));")}
  ${mediaQueries("xxl")("grid-template-columns: repeat(4, minmax(0, 1fr));")}
`;
