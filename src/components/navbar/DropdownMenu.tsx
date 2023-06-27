"use client";

import { mediaQueries } from "@/lib/styled-components";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import styled from "styled-components";
import { signOut } from "next-auth/react";

interface DropdownMenuProps {
  currentUser?: User | null;
  setIsOpen: (isOpen: boolean) => void;
}

const DropdownMenuContent = styled.div`
  position: absolute;
  right: 0;
  top: 3rem;

  width: 40vw;
  ${mediaQueries("md")("width: 75%;")}

  overflow: hidden;

  background-color: var(--backgroundColor);
  border-radius: 0.75rem;

  font-size: 0.875rem;
  line-height: 1.25rem;

  .menu-list {
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
`;

type MenuOptionProps = { mobileOnly?: boolean };
const MenuOption = styled.div<MenuOptionProps>`
  padding: 0.75rem 1rem;

  font-weight: 600;

  background-color: var(--dividerColor);
  color: var(--textColor);

  transition: all 150ms;

  &:hover {
    background-color: var(--iconSecondaryHoverColor);
    color: var(--backgroundColor);
  }

  ${(props) => props.mobileOnly && mediaQueries("md")("display: none;")}
  ${(props) => props.mobileOnly && "display: block;"}
`;

const DropdownMenu: FC<DropdownMenuProps> = ({ currentUser, setIsOpen }) => {
  const router = useRouter();

  return (
    <DropdownMenuContent>
      <div className="menu-list">
        {currentUser && (
          <>
            <MenuOption
              onClick={() => {
                router.push("/trips");
                setIsOpen(false);
              }}
            >
              My trips
            </MenuOption>
            <MenuOption
              onClick={() => {
                router.push("/favorites");
                setIsOpen(false);
              }}
            >
              My favorites
            </MenuOption>
            <MenuOption
              onClick={() => {
                router.push("/properties");
                setIsOpen(false);
              }}
            >
              My properties
            </MenuOption>
            <MenuOption
              onClick={() => {
                router.push("/reservations");
                setIsOpen(false);
              }}
            >
              Guests reservations
            </MenuOption>

            <hr />
            <MenuOption onClick={() => signOut()}>Log out</MenuOption>
          </>
        )}
      </div>
    </DropdownMenuContent>
  );
};

export default DropdownMenu;
