"use client";

import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import { Listing, Reservation, User } from "@prisma/client";
import { FC, useEffect, useMemo } from "react";
import { categories } from "@/constants/categories";
import styled from "styled-components";
import dynamic from "next/dynamic";
import useCountries from "@/hooks/useCountries";
import { mediaQueries } from "@/lib/styled-components";
import useReserveModal from "@/hooks/modals/useReserveModal";

const Map = dynamic(() => import("../../../../components/ui/Map"), {
  ssr: false,
});

export interface ListingClientProps {
  reservations?: Reservation[];
  listing: Listing & { user: User };
  currentUser?: User | null;
}

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    margin-top: 1.5rem;
    ${mediaQueries("md")(`
        grid-template-columns: repeat(7, minmax(0, 1fr)); 
        gap: 2.5rem;
        `)}

    .right-section {
      order: -1;
      ${mediaQueries("md")(`
          order: 1;
          grid-column: span 3 / span 3;
          `)}
      margin-bottom: 2.5rem;
    }
  }
`;

const ListingClient: FC<ListingClientProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(listing.locationValue)?.latlng;
  const reserveModal = useReserveModal();

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  useEffect(() => {
    reserveModal.setListing(listing);
    reserveModal.setReservations(reservations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <FlexWrapper>
        <ListingHead
          title={listing.title}
          price={listing.price}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
        />
        <div className="grid-layout">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
          />
          <div className="right-section">
            <Map center={coordinates} />
          </div>
        </div>
      </FlexWrapper>
    </Container>
  );
};

export default ListingClient;
