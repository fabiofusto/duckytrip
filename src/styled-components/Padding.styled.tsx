"use client";

import styled from "styled-components";

type PaddingProps = {
  marginTopXl?: boolean;
  marginTopMd?: boolean;
  marginTopSm?: boolean;
};
export const Padding = styled.div<PaddingProps>`
  padding: 0 50px;
  margin-top: ${(props) => props.marginTopXl && "7rem"};
  margin-top: ${(props) => props.marginTopMd && "5rem"};
  margin-top: ${(props) => props.marginTopSm && "2rem"};
`;

export const PaddingChildren = styled.div`
  padding-bottom: 3rem;
  padding-top: 7rem;
`;

type HeightManagerProps = { isHomepage?: boolean; isEmptyPage?: boolean };
export const HeightManager = styled.div<HeightManagerProps>`
  min-height: ${(props) =>
    props.isHomepage ? "calc(100vh - 372px)" : "calc(100vh - 292px)"};
  min-height: ${(props) => props.isEmptyPage && "calc(100vh - 261px)"};
`;
