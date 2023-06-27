"use client";

import useCountries from "@/hooks/useCountries";
import { User } from "@prisma/client";
import { FC } from "react";
import Image from "next/image";
import HeartButton from "../ui/HeartButton";
import styled from "styled-components";

interface ListingHeadProps {
  title: string;
  price: number;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser: User | null | undefined;
}

const ImageWrapper = styled.div`
  width: 100%;
  height: 60vh;
  overflow: hidden;
  border-radius: 0.75rem;
  position: relative;

  .image {
    object-fit: cover;
    width: 100%;
  }

  .details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem;
    padding: 1rem;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 25%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);

    .heading {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
        color: var(--textColor);
      }

      .subtitle {
        font-weight: 300;
        margin-top: 0.5rem;
        color: var(--textColor);
      }
    }

    .price {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;

      font-size: 1.5rem;
      line-height: 2rem;
      font-weight: 600;
      color: var(--textColor);

      .night {
        font-weight: 300;
        color: var(--textColor);
      }
    }
  }

  .heart-button {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
  }
`;

const ListingHead: FC<ListingHeadProps> = ({
  title,
  price,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <ImageWrapper>
      <Image alt="image" src={imageSrc} fill className="image" />
      <div className="heart-button">
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
      <div className="details">
        <div className="heading">
          <div className="title">{title}</div>
          <div className="subtitle">{`${location?.region}, ${location?.label}`}</div>
        </div>
        <div className="price">
          €{price} <span className="night">night</span>
        </div>
      </div>
    </ImageWrapper>
  );
};

export default ListingHead;
