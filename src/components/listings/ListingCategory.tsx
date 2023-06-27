"use client";

import { FC } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .content-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;

    .icon {
      color: var(--iconSecondaryColor);
    }

    .text-content {
      display: flex;
      flex-direction: column;

      .label {
        font-size: 1.125rem;
        line-height: 1.75rem;
        color: var(--textColor);
      }

      .description {
        font-weight: 300;
        color: var(--iconSecondaryHoverColor);
      }
    }
  }
`;

const ListingCategory: FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <Card>
      <div className="content-wrapper">
        <Icon size={40} className="icon" />
        <div className="text-content">
          <div className="label">{label}</div>
          <div className="description">{description}</div>
        </div>
      </div>
    </Card>
  );
};

export default ListingCategory;
