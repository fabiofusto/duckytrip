"use client";

import { User } from "@prisma/client";
import { FC } from "react";
import { IconType } from "react-icons";
import Avatar from "../ui/Avatar";
import ListingCategory from "./ListingCategory";
import styled from "styled-components";

interface ListingInfoProps {
  user: User;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
}

const Container = styled.div`
  grid-column: span 4 / span 4;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .flex-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .host-informations {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 600;
      color: var(--textColor);

      .caption {
        font-weight: 300;
      }
    }

    .listing-informations {
      display: flex;
      align-items: center;
      gap: 1rem;

      font-weight: 300;
      color: var(--iconSecondaryHoverColor);
    }
  }

  .description {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 300;
    color: var(--iconSecondaryHoverColor);
  }
`;

const ListingInfo: FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
}) => {
  return (
    <Container>
      <div className="flex-wrapper">
        <div className="host-informations">
          <div>
            <span className="caption">Hosted by</span> {user?.name}
          </div>
          <Avatar src={user?.image} />
        </div>
        <div className="listing-informations">
          <div>{guestCount} guests</div>
          {" | "}
          <div>{roomCount} rooms</div>
          {" | "}
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="description">{description}</div>
    </Container>
  );
};

export default ListingInfo;
