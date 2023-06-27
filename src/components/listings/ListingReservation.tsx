"use client";

import { FC } from "react";

import useReserveModal from "@/hooks/modals/useReserveModal";
import ReserveModal from "../modals/ReserveModal";
import { Listing, Reservation, User } from "@prisma/client";
import { mediaQueries } from "@/lib/styled-components";
import styled from "styled-components";
import { BiCalendarPlus } from "react-icons/bi";

interface ListingReservationProps {
  reservations?: Reservation[];
  listing: Listing & { user: User };
  currentUser?: User | null;
}

const ReserveButton = styled.div`
  ${mediaQueries("md")(
    "border-width: 2px;border-radius: var(--borderRadiusXl);border-color: var(--borderColor);"
  )}

  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${mediaQueries("md")("padding: 0.25rem 0.25rem 0.25rem 0.75rem;")}

  cursor: pointer;
  transition: all 150ms;

  background-color: var(--backgroundColor);

  &:hover {
    scale: 1.05;
  }

  .icon-wrapper {
    padding: 0.25rem;
    background-color: var(--iconColor);
    border-radius: var(--borderRadiusXl);
    color: var(--backgroundColor);
  }

  .label {
    display: none;
    ${mediaQueries("md")("display: block;")}
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
    color: var(--textColor);
  }

  &:hover > .label {
    color: white;
  }
`;

const ListingReservation: FC<ListingReservationProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const reserveModal = useReserveModal();
  return (
    <>
      <ReserveButton onClick={reserveModal.onOpen}>
        <p className="label">Reserve</p>
        <div className="icon-wrapper">
          <BiCalendarPlus size={20} />
        </div>
      </ReserveButton>
      <ReserveModal
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </>
  );
};

export default ListingReservation;
