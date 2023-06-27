"use client";

import { FC } from "react";
import styled from "styled-components";

const FooterStyled = styled.div`
  position: relative;
  bottom: 0;

  width: 100%;
  height: 100px;

  background-color: var(--backgroundColor);

  display: flex;
  align-items: center;
  justify-content: center;

  .text {
    color: var(--textColor);
  }
`;

const Footer: FC = () => {
  return (
    <FooterStyled>
      <h1 className="text">DuckyTrip ©2023 Created by Fabio Fusto</h1>
    </FooterStyled>
  );
};

export default Footer;
