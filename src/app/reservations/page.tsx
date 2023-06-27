import EmptyState from "@/components/ui/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import ReservationsClient from "./components/ReservationsClient";
import { HeightManager } from "@/styled-components/Padding.styled";

const ReservationsPage = async () => {
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

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0)
    return (
      <HeightManager isEmptyPage>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your property"
        />
      </HeightManager>
    );

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationsPage;
