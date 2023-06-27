"use client";

import useFavorite from "@/hooks/useFavorite";
import { User } from "@prisma/client";
import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButtonContainer = styled.div`
  position: relative;
  cursor: pointer;
  transition: opacity 150ms;

  &:hover {
    opacity: 0.8;
  }

  .outline-heart {
    fill: white;
    position: absolute;
    top: -2px;
    right: -2px;
  }

  .empty-heart {
    fill: rgb(115 115 115 / 0.7);
  }

  .fill-heart {
    fill: #f43f5e;
  }
`;

const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <HeartButtonContainer onClick={toggleFavorite}>
      <AiOutlineHeart size={28} className="outline-heart" />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-heart" : "empty-heart"}
      />
    </HeartButtonContainer>
  );
};

export default HeartButton;
