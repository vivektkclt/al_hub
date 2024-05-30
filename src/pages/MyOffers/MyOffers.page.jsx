import React from "react";
import { C } from "../../assets";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { withHeader } from "../../hoc/withHeader";
import getUserOffers from "../../graphql/queries/getUserOffers";
import OfferList from "../../components/OfferList/OfferList.component";
import CustomHeader from "../../components/Headers/CustomHeader.component";
// import RootMyOffersTopTabBar from "../../routes/tabs/rootMyOffersTopTabBar";

const HeaderComponent = () => (
  <CustomHeader isBack hideShadow title={C.strings.MY_OFFERS} />
);

// const BodyComponent = () => <RootMyOffersTopTabBar />;
const BodyComponent = () => {
  const { token: {access_token: token} } = useSelector((state) => state.user);
  const { data, loading, error } = useQuery(getUserOffers, {
    fetchPolicy: "cache-and-network",
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
  return <OfferList data={data?.UserOffers} loading={loading} />;
};

const MyOffersPage = withHeader({ HeaderComponent, BodyComponent });

export default MyOffersPage;
