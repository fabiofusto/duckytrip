"use client";

import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiEuro } from "react-icons/bi";
import styled from "styled-components";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

type InputWrapperProps = {
  formatPrice?: boolean;
  errors: FieldErrors;
  id: string;
};
const InputWrapper = styled.div<InputWrapperProps>`
  width: 100%;
  position: relative;

  .icon-price {
    position: absolute;
    top: 1.5rem;
    left: 0.5rem;
    color: var(--textColor);
  }

  .input {
    width: 100%;
    padding: 1rem;
    padding-top: 1.5rem;
    font-weight: 300;
    background-color: var(--dividerColor);
    border-width: 2px;
    border-radius: 0.375rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
    color: var(--textColor);

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    ${(props) =>
      props.formatPrice ? "padding-left: 2.25rem" : "padding-left: 1rem"};
    ${(props) =>
      props.errors[props.id]
        ? "border-color: var(--errorColor)"
        : "border-color: var(--borderColor)"};
    ${(props) =>
      props.errors[props.id]
        ? "&:focus {border-color: var(--errorColor)}"
        : "&:focus{border-color: var(--textColor)}"};
  }

  .label {
    position: absolute;
    font-size: 1rem;
    line-height: 1.5rem;
    top: 1.25rem;
    z-index: 10;

    ${(props) => (props.formatPrice ? "left: 2.25rem" : "left: 1rem")};
    ${(props) =>
      props.errors[props.id]
        ? "color: var(--errorColor)"
        : "color: var(--textColor)"};
  }
`;

const Input: FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <InputWrapper formatPrice={formatPrice} errors={errors} id={id}>
      {formatPrice && <BiEuro size={24} className="icon-price" />}
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className="peer transition input"
      />
      <label className="label duration-150 transform -translate-y-3  origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
        {label}
      </label>
    </InputWrapper>
  );
};

export default Input;
