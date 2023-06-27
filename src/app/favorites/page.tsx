import getCurrentUser from "@/actions/getCurrentUser";
import getFavorites from "@/actions/getFavorites";

import EmptyState from "@/components/ui/EmptyState";
import FavoritesClient from "./components/FavoritesClient";
import { HeightManager } from "@/styled-components/Padding.styled";

const FavoritesPage = async () => {
  const favorites = await getFavorites();
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <HeightManager isEmptyPage>
        <EmptyState
          title="You are not logged in"
          subtitle="Please log in to view your reservations"
        />
      </HeightManager>
    );

  if (favorites.length === 0)
    return (
      <HeightManager isEmptyPage>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </HeightManager>
    );

  return <FavoritesClient favorites={favorites} currentUser={currentUser} />;
};

export default FavoritesPage;
