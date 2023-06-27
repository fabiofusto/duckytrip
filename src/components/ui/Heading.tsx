"use client";

import { FC } from "react";
import styled from "styled-components";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

type HeadingStyleProps = { center?: boolean };
const HeadingStyle = styled.div<HeadingStyleProps>`
  text-align: ${(props) => (props.center ? "center" : "start")};

  .title {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: var(--textColor);
  }

  .subtitle {
    font-weight: 300;
    margin-top: 0.5rem;
    color: var(--iconSecondaryHoverColor);
  }
`;

const Heading: FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <HeadingStyle center={center}>
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle}</div>
    </HeadingStyle>
  );
};

export default Heading;
