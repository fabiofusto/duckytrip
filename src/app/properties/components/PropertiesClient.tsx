"use client";

import Heading from "@/components/ui/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { Listing, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { GridLayout } from "@/styled-components/GridLayout.styled";
import { HeightManager, Padding } from "@/styled-components/Padding.styled";

interface PropertiesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted!");
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
          title="Your properties"
          subtitle="Manage your properties here"
        />
        <GridLayout marginTopSm>
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
        </GridLayout>
      </HeightManager>
    </Padding>
  );
};

export default PropertiesClient;
