import EmptyState from "@/components/ui/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";

import getListings from "@/actions/getListings";
import PropertiesClient from "./components/PropertiesClient";
import { HeightManager } from "@/styled-components/Padding.styled";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return (
      <HeightManager isEmptyPage>
        <EmptyState title="Unauthorized" subtitle="Please log in." />
      </HeightManager>
    );

  const listings = await getListings({ userId: currentUser.id });
  if (listings.length === 0)
    return (
      <HeightManager isEmptyPage>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </HeightManager>
    );

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
