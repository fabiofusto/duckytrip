"use client";

import { FC, useCallback, useState } from "react";
import useLoginModal from "@/hooks/modals/useLoginModal";
import { User } from "@prisma/client";
import useRentModal from "@/hooks/modals/useRentModal";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { mediaQueries } from "@/lib/styled-components";
import { MdOutlineAddHomeWork } from "react-icons/md";
import useReserveModal from "@/hooks/modals/useReserveModal";
import ListingReservation from "../listings/ListingReservation";
import DropdownMenu from "./DropdownMenu";
import MenuToggle from "./MenuToggle";

interface UserMenuProps {
  currentUser?: User | null;
}

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RentButton = styled.div`
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

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const reserveModal = useReserveModal();
  const pathname = usePathname();

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div style={{ position: "relative" }}>
      <FlexWrapper>
        {pathname.includes("/listings") ? (
          <ListingReservation
            listing={reserveModal.listing}
            reservations={reserveModal.reservations}
            currentUser={currentUser}
          />
        ) : (
          <RentButton onClick={onRent}>
            <p className="label">Add your place</p>
            <div className="icon-wrapper">
              <MdOutlineAddHomeWork size={20} />
            </div>
          </RentButton>
        )}

        {currentUser && (
          <MenuToggle currentUser={currentUser} toggleOpen={toggleOpen} />
        )}
      </FlexWrapper>
      {isOpen && (
        <DropdownMenu currentUser={currentUser} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default UserMenu;
