"use client";

import { FC } from "react";
import { BarLoader } from "react-spinners";
import styled from "styled-components";

const LoaderContainer = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Loader: FC = () => {
  return (
    <LoaderContainer>
      <BarLoader width={500} height={5} color="#057A55" />
    </LoaderContainer>
  );
};

export default Loader;
