import React from "react";
import { C } from "../../assets";
import { Text, View } from "react-native";
import DashComponent from "../Dash/Dash.component";
import { formatDate } from "../../utils/functions";
import { navigator } from "../../routes/navigations";
import { offerStatus } from "../../utils/utilConfigs";
import SvgButton from "../Buttons/SvgButton.component";
import { useDispatch, useSelector } from "react-redux";
import { modalSlice } from "../../redux/slices/modal.slice";
import { OfferDetailsCardStyles as styles } from "./OfferDetailsCard.style";
import claimOffer from "../../graphql/mutations/claimOffer";
import { useMutation } from "@apollo/client";
import { useClaimOffer } from "../../hooks/useClaimAndRedeemOffer";

const ReviewFooter = ({ onClaimHandler }) => {
  return (
    <View style={styles.claimView}>
      {/* <Text style={styles.offerDescTxt}>{C.strings.OFFER_CLAIM_DESC}</Text>
    <View style={styles.row}>
      <Text style={styles.offerDescTxt}>{C.strings.VALID_FOR}</Text>
      <Text style={[styles.offerDescTxt, styles.clrRed]}>{" 30 Minutes "}</Text>
      <Text style={styles.offerDescTxt}>{C.strings.ONLY}</Text>
    </View> */}
      <SvgButton
        showBg
        height={45}
        width={280}
        btnStyle={styles.btnStyle}
        onBtnHandler={onClaimHandler}
        placeholder={C.strings.WRITE_REVIEW}
      />
    </View>
  );
};

const UnlockedFooter = ({ storeName, onRadeemHandler, offerType }) => {
  return (
    <View style={styles.claimView}>
      {offerType !== "free" ? (
        <Text style={styles.offerDescTxt}>{C.strings.OFFER_REDEEM_DESC}</Text>
      ) : null}
      <Text style={styles.addTxt}>{storeName}</Text>
      <SvgButton
        showBg
        height={45}
        width={280}
        btnStyle={styles.btnStyle}
        onBtnHandler={onRadeemHandler}
        placeholder={C.strings.REDEEM_OFFER}
      />
    </View>
  );
};

const FreeFooter = ({ storeName, onRadeemHandler, offerType }) => {
  return (
    <View style={styles.claimView}>
      {offerType !== "free" ? (
        <Text style={styles.offerDescTxt}>{C.strings.OFFER_REDEEM_DESC}</Text>
      ) : null}
      <Text style={styles.addTxt}>{storeName}</Text>
      <SvgButton
        showBg
        height={45}
        width={280}
        btnStyle={styles.btnStyle}
        onBtnHandler={onRadeemHandler}
        placeholder={C.strings.REDEEM_OFFER}
      />
    </View>
  );
};

const RadeemedFooter = ({ code }) => (
  <View style={[styles.claimView, { marginTop: 30 }]}>
    <Text style={styles.drkMedTxt}>{C.strings.REDEEM_DESC}</Text>
    <View style={styles.radeemView}>
      <Text style={[styles.txtRed, styles.txtUpper, styles.radeemTxt]}>
        {code}
      </Text>
    </View>
  </View>
);

const OfferDetailsCard = ({ data }) => {
  const dispatch = useDispatch();
  const { selectedStore, selectedOffer } = useSelector(
    (state) => state.category
  );
  const { radeemCode } = useSelector((state) => state.offer);
  console.log(radeemCode, "radeem code");
  const offerId = selectedOffer?.id;
  const storeId = selectedStore?.Store?.id;
  const storeName = selectedStore?.Store?.name;
  const backgroundColor =
    data?.status === offerStatus?.REDEEMED
      ? C.colors.offerCard.green
      : data?.status === offerStatus.UNLOCKED
      ? C.colors.offerCard.blue
      : C.colors.offerCard.grey;

  const status =
    data?.status === offerStatus?.REDEEMED
      ? C.strings.REDEEMED
      : data?.status === offerStatus.UNLOCKED
      ? C.strings.UNLOCKED
      : data?.status === offerStatus.REVIEW_TO_CLAIM
      ? // ? C.strings.REVIEW_TO_CLAIM
        ""
      : data?.status === offerStatus.BUY_OFFER
      ? C.strings.BUY_OFFER
      : "";

  const removeLastWord = (str) => {
    const lastIndexOfSpace = str?.lastIndexOf(" ");
    if (lastIndexOfSpace === -1) {
      return str;
    }
    return str ? str.substring(0, lastIndexOfSpace) : "";
  };

  const endDate = formatDate(data?.endsAt);
  const offerFirstWord = removeLastWord(data?.shortTitle);
  const offerLastWord = data?.shortTitle?.split(" ").splice(-1);
  const onRadeemHandler = async () => {
    dispatch(modalSlice.actions.showRadeemModal());
  };
  const onReviewHandler = () =>
    navigator.navigate("RatingPage", {
      offerId,
    });
  const { redeem } = useClaimOffer({ offerId, storeId });
  return (
    <View style={styles.card}>
      <View style={[styles.v1, { backgroundColor }]}>
        <Text style={styles.txtWhite}>{status}</Text>
      </View>
      <View style={styles.v2}>
        <Text style={styles.txtDrk}>{offerFirstWord}</Text>
        <Text style={styles.txtRed}>{offerLastWord}</Text>
        <Text style={styles.nameTxt}>{storeName}</Text>
        <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.txtSmDrk}>
          {data?.shortDescription}
        </Text>
        <Text style={[styles.txtRedMed, styles.txtUpper]}>
          {C.strings.VALID_TILL} {endDate}
        </Text>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.addTxt}>
          {data?.longDescription}
        </Text>
      </View>
      <View style={styles.v3}>
        <View style={[styles.absoluteIcon, styles.absoluteLeft]} />
        <View style={[styles.absoluteIcon, styles.absoluteRight]} />
        <DashComponent
          dashGap={12}
          dashLength={8}
          style={styles.dash}
          dashColor={C.colors.border.dark}
        />
        {console.log(data, "OFFER_DATA_CHECK")}
        {data?.status === offerStatus?.UNLOCKED ? (
          <UnlockedFooter
            offerType={data?.offerType}
            storeName={storeName}
            onRadeemHandler={onRadeemHandler}
          />
        ) : data?.offerType == "free" &&
          data?.status === offerStatus?.REVIEW_TO_CLAIM ? (
          <FreeFooter offerType={data?.offerType} onRadeemHandler={redeem} />
        ) : data?.status === offerStatus?.REDEEMED ? (
          <RadeemedFooter offerType={data?.offerType} code={radeemCode} />
        ) : data?.status === offerStatus?.REVIEW_TO_CLAIM ? (
          <ReviewFooter
            offerType={data?.offerType}
            onClaimHandler={onReviewHandler}
          />
        ) : null}
      </View>
    </View>
  );
};

export default OfferDetailsCard;
