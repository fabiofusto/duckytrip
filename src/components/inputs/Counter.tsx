"use client";

import { FC, useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .counter-heading {
    display: flex;
    flex-direction: column;

    .title {
      color: var(--textColor);
      font-weigth: 500;
    }
    .subtitle {
      font-weight: 300;
      color: var(--iconSecondaryHoverColor);
    }
  }

  .counter-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;

    .buttons {
      width: 2.5rem;
      height: 2.5rem;

      border-radius: var(--borderRadiusXl);

      display: flex;
      align-items: center;
      justify-content: center;

      color: var(--textColor);

      cursor: pointer;
      transition: all 150ms;

      &:hover {
        scale: 1.05;
      }
    }

    .plus {
      background-color: var(--iconColor);
    }
    .minus {
      background-color: var(--errorColor);
    }

    .label {
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 300;
      color: var(--textColor);
    }
  }
`;

const Counter: FC<CounterProps> = ({ title, subtitle, value, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <CounterWrapper>
      <div className="counter-heading">
        <div className="title">{title}</div>
        <div className="subtitle">{subtitle}</div>
      </div>
      <div className="counter-buttons">
        <div onClick={onReduce} className="buttons minus">
          <AiOutlineMinus />
        </div>
        <div className="label">{value}</div>
        <div onClick={onAdd} className="buttons plus">
          <AiOutlinePlus />
        </div>
      </div>
    </CounterWrapper>
  );
};

export default Counter;
