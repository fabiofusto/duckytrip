"use client";

import Heading from "@/components/ui/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { Listing, User } from "@prisma/client";
import { FC } from "react";
import { HeightManager, Padding } from "@/styled-components/Padding.styled";
import { GridLayout } from "@/styled-components/GridLayout.styled";

interface FavoritesClientProps {
  favorites: Listing[];
  currentUser?: User | null;
}

const FavoritesClient: FC<FavoritesClientProps> = ({
  favorites,
  currentUser,
}) => {
  return (
    <Padding marginTopSm>
      <HeightManager>
        <Heading
          center
          title="Your favorites"
          subtitle="Here is the list of places you have favorited"
        />
        <GridLayout marginTopSm>
          {favorites.map((favorite) => (
            <ListingCard
              key={favorite.id}
              currentUser={currentUser}
              data={favorite}
            />
          ))}
        </GridLayout>
      </HeightManager>
    </Padding>
  );
};

export default FavoritesClient;
