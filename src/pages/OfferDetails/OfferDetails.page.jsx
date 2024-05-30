import React from "react";
import { C } from "../../assets";
import { View, Text } from "react-native";
import { useQuery } from "@apollo/client";
import { commonStyles } from "../../styles";
import { withHeader } from "../../hoc/withHeader";
import { useDispatch, useSelector } from "react-redux";
import { offerDetailStyle } from "./OfferDetails.style";
import { modalSlice } from "../../redux/slices/modal.slice";
import RadeemModal from "../../components/Modals/Radeem.modal";
import getOfferDetails from "../../graphql/queries/getOfferDetails";
import ModalComponent from "../../components/Modals/Modal.component";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import OfferDetailsCard from "../../components/OfferDetailsCard/OfferDetailsCard.component";

const HeaderComponent = () => (
  <CustomHeader isBack hideShadow title={C.strings.OFFER_DETAILS} />
);

const BodyComponent = () => {
  const dispatch = useDispatch();
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const { radeemModal } = useSelector((state) => state.modal);
  const { selectedStore, selectedOffer } = useSelector(
    (state) => state.category
  );
  const onModalDismiss = () => dispatch(modalSlice.actions.dismissModals());
  const { data, loading, error } = useQuery(getOfferDetails, {
    variables: {
      offerId: selectedOffer?.id,
      storeId: selectedStore?.Store?.id
        ? selectedStore?.Store?.id
        : selectedOffer?.storeId,
    },
    fetchPolicy: "network-only",
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
  console.log(error);
  return (
    <View style={[commonStyles.align.itemsCenter, offerDetailStyle.mainStyle]}>
      {loading ? (
        <Text style={{ color: C.colors.text.black }}>Please wait...</Text>
      ) : (
        <OfferDetailsCard data={data?.OfferDetails} />
      )}
      {radeemModal && (
        <ModalComponent
          modalState={radeemModal}
          onModalDismiss={onModalDismiss}
          children={<RadeemModal onModalDismiss={onModalDismiss} />}
        />
      )}
    </View>
  );
};

const OfferDetailsPage = withHeader({ HeaderComponent, BodyComponent });

export default OfferDetailsPage;
