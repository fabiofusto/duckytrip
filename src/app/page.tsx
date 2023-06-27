export const dynamic = "force-dynamic";

import getCurrentUser from "@/actions/getCurrentUser";
import getListings, { IListingParams } from "@/actions/getListings";
import EmptyState from "@/components/ui/EmptyState";
import ListingCard from "@/components/listings/ListingCard";
import { Listing } from "@prisma/client";
import { HeightManager, Padding } from "@/styled-components/Padding.styled";
import { GridLayout } from "@/styled-components/GridLayout.styled";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0)
    return (
      <HeightManager isEmptyPage>
        <EmptyState />;
      </HeightManager>
    );

  return (
    <Padding marginTopXl>
      <HeightManager isHomepage>
        <GridLayout>
          {listings.map((listing: Listing) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            );
          })}
        </GridLayout>
      </HeightManager>
    </Padding>
  );
};

export default Home;
