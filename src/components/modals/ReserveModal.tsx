"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import useReserveModal from "@/hooks/modals/useReserveModal";
import Calendar from "../inputs/Calendar";
import { Range, RangeKeyDict } from "react-date-range";
import Heading from "../ui/Heading";
import { ReserveModalContainer } from "@/styled-components/Modal.styled";
import useLoginModal from "@/hooks/modals/useLoginModal";
import { useRouter } from "next/navigation";
import { Listing, Reservation, User } from "@prisma/client";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ReserveModalProps {
  reservations?: Reservation[];
  listing: Listing & { user: User };
  currentUser?: User | null;
}

const ReserveModal: FC<ReserveModalProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const reserveModal = useReserveModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation: Reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      reserveModal.onClose();
      return loginModal.onOpen();
    }

    setIsLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing booked successfully!");
        setDateRange(initialDateRange);
        reserveModal.onClose();
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => toast.error("Something went wrong."))
      .finally(() => {
        setIsLoading(false);
        reserveModal.onClose();
        setDateRange(initialDateRange);
      });
  }, [
    currentUser,
    reserveModal,
    loginModal,
    totalPrice,
    dateRange,
    listing?.id,
    router,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const days = differenceInDays(dateRange.endDate, dateRange.startDate);
      console.log(days);

      if (days && listing.price) {
        setTotalPrice(days * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const bodyContent = (
    <ReserveModalContainer>
      <Heading
        title="Plan your trip"
        subtitle="Pick a range of dates from the available ones below"
      />
      <div className="calendar-container">
        <hr />
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value: RangeKeyDict) => setDateRange(value.selection)}
        />
        <hr />
        <div className="price-container">
          <div>Total</div>
          <div>€ {totalPrice}</div>
        </div>
      </div>
    </ReserveModalContainer>
  );

  return (
    <Modal
      isOpen={reserveModal.isOpen}
      onClose={() => {
        reserveModal.onClose();
        setDateRange(initialDateRange);
      }}
      title="Reserve"
      actionLabel="Reserve"
      onSubmit={onCreateReservation}
      body={bodyContent}
      disabled={isLoading}
    />
  );
};

export default ReserveModal;
