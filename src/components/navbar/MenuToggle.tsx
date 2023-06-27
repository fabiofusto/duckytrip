"use client";

import { User } from "@prisma/client";
import { FC } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../ui/Avatar";
import styled from "styled-components";
import { mediaQueries } from "@/lib/styled-components";

interface MenuToggleProps {
  currentUser?: User | null;
  toggleOpen: () => void;
}

const MenuToggleStyled = styled.div`
  .right-section-wrapper {
    padding: 1rem;
    ${mediaQueries("md")("padding: 0.25rem 0.5rem;")}

    border-radius: var(--borderRadiusXl);
    border-color: rgb(212 212 212);

    display: flex;
    align-items: center;
    gap: 0.75rem;

    color: var(--textColor);

    cursor: pointer;

    .icon:hover {
      transition: all 150ms;
      scale: 1.1;
    }
  }

  .right-section-wrapper > .avatar-wrapper {
    display: none;
    ${mediaQueries("md")("display: block;")};
  }
`;

const MenuToggle: FC<MenuToggleProps> = ({ currentUser, toggleOpen }) => {
  return (
    <MenuToggleStyled>
      <div
        className="right-section-wrapper"
        onClick={() => {
          toggleOpen();
        }}
      >
        <AiOutlineMenu className="icon" size={20} />

        <div className="avatar-wrapper">
          <Avatar src={currentUser?.image} />
        </div>
      </div>
    </MenuToggleStyled>
  );
};

export default MenuToggle;
