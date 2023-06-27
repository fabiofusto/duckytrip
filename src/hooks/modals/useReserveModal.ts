import { ListingClientProps } from "@/app/listings/[listingId]/components/ListingClient";
import { Listing, Reservation, User } from "@prisma/client";
import { create } from "zustand";

interface ReserveModalState extends ListingClientProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  listing: Listing & { user: User };
  setListing: (listing: Listing & { user: User }) => void;
  reservations: Reservation[];
  setReservations: (reservations: Reservation[]) => void;
}

const useReserveModal = create<ReserveModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  listing: {} as Listing & { user: User },
  setListing: (listing: Listing & { user: User }) => set({ listing: listing }),
  reservations: [],
  setReservations: (reservations: Reservation[]) =>
    set({ reservations: reservations }),
}));

export default useReserveModal;
