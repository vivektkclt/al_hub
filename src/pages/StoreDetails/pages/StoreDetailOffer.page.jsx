import React from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import getStoreOffers from "../../../graphql/queries/getStoreOffers";
import OfferList from "../../../components/OfferList/OfferList.component";

const StoreDetailOfferPage = () => {
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const { selectedStore } = useSelector((state) => state.category);
  const { data, loading, error } = useQuery(getStoreOffers, {
    variables: {
      storeId: selectedStore?.Store?.id,
    },
    fetchPolicy: "cache-and-network",
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
  return <OfferList data={data?.OffersByStore} loading={loading} />;
};

export default StoreDetailOfferPage;
