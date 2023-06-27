"use client";

import Heading from "@/components/ui/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { Listing, Reservation, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { HeightManager, Padding } from "@/styled-components/Padding.styled";
import { GridLayout } from "@/styled-components/GridLayout.styled";

interface ReservationsClientProps {
  reservations: (Reservation & {
    listing: Listing;
  })[];
  currentUser?: User | null;
}

const ReservationsClient: FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled!");
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong."))
        .finally(() => setDeletingId(""));
    },
    [router]
  );

  return (
    <Padding marginTopSm>
      <HeightManager>
        <Heading
          center
          title="Guests reservations"
          subtitle="Manage all the bookings on your properties"
        />
        <GridLayout marginTopSm>
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          ))}
        </GridLayout>
      </HeightManager>
    </Padding>
  );
};

export default ReservationsClient;
