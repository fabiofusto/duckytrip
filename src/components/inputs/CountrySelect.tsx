"use client";

import useCountries from "@/hooks/useCountries";
import { FC } from "react";
import Select from "react-select";
import styled from "styled-components";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const SelectStyled = styled.div`
  .control {
    padding: 0.75rem;
    border-width: 2px;
  }

  .input,
  .option {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
`;

const SelectOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .region {
    color: var(--iconSecondaryColor);
    margin-left: 0.25rem;
  
`;

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <SelectStyled>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option) => (
          <SelectOption>
            <div>{option.flag}</div>
            <div>
              {option.label}, <span className="region">{option.region}</span>
            </div>
          </SelectOption>
        )}
        classNames={{
          control: () => "control",
          input: () => "input",
          option: () => "option",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#31C48D",
          },
        })}
      />
    </SelectStyled>
  );
};

export default CountrySelect;
