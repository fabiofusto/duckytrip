import EmptyState from "@/components/ui/EmptyState";
import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import TripsClient from "./components/TripsClient";
import { HeightManager } from "@/styled-components/Padding.styled";

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return (
      <HeightManager isEmptyPage>
        <EmptyState title="Unauthorized" subtitle="Please log in." />
      </HeightManager>
    );

  const reservations = await getReservations({ userId: currentUser.id });
  if (reservations.length === 0)
    return (
      <HeightManager isEmptyPage>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        />
      </HeightManager>
    );

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default page;
