"use client";

import useCountries from "@/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import HeartButton from "../ui/HeartButton";
import Button from "../ui/Button";
import styled from "styled-components";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation & { listing: Listing };
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  disabled?: boolean;
  currentUser: User | null | undefined;
}

const Wrapper = styled.div`
  grid-column: span 1 / span 1;
  cursor: pointer;

  border-radius: var(--borderRadiusLg);
  position: relative;
  height: 280px;
  width: 400px;

  .image-wrapper {
    width: 100%;
    border-radius: var(--borderRadiusLg);
    overflow: hidden;

    border-bottom-right-radius: var(--borderRadiusLg);
    border-bottom-left-radius: var(--borderRadiusLg);
  }

  .heart-button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
  }

  .details {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);

    border-bottom-right-radius: var(--borderRadiusLg);
    border-bottom-left-radius: var(--borderRadiusLg);

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    width: 100%;
    max-height: 40%;
    transition: all 0.2s ease-in-out;

    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    .infos {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 0.5rem;
      width: 100%;
    }

    .location {
      font-weight: 600;
      font-size: 1.125rem;
      line-height: 1.75rem;
      color: var(--textColor);
    }

    .reservation-date {
      font-weight: 300;
      color: var(--textColor);
    }

    .price {
      padding-top: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--textColor);
    }

    .description {
      display: none;
    }
  }

  &:hover {
    .details {
      max-height: 70%;
    }

    .description {
      display: block;

      margin-top: 2rem;
      color: var(--textColor);
      font-weight: 200;

      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      white-space: pre-wrap;
    }
  }
`;

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  actionLabel,
  actionId = "",
  disabled,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <Wrapper onClick={() => router.push(`/listings/${data.id}`)}>
      <div className="image-wrapper">
        <Image
          fill
          alt="listing"
          src={data.imageSrc}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            borderRadius: "var(--borderRadiusLg)",
          }}
        />
        <div className="heart-button">
          <HeartButton listingId={data.id} currentUser={currentUser} />
        </div>
      </div>

      <div className="details">
        <div className="infos">
          <div className="left-side">
            <div className="location">
              {location?.region}, {location?.label}
            </div>
            <div className="reservation-date">
              {reservationDate || data.category}
            </div>
            {!reservation && <p className="description">{data.description}</p>}
          </div>
          <div className="price">
            <div style={{ display: "flex", fontWeight: "700" }}>
              <span>€</span> {price}
            </div>
            {!reservation && <div style={{ fontWeight: "300" }}> night</div>}
          </div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            size="small"
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default ListingCard;
