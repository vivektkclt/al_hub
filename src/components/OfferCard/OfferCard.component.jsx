import React from "react";
import { C } from "../../assets";
import DashComponent from "../Dash/Dash.component";
import { formatDate } from "../../utils/functions";
import { navigator } from "../../routes/navigations";
import { offerStatus } from "../../utils/utilConfigs";
import { useDispatch, useSelector } from "react-redux";
import { Text, TouchableOpacity, View } from "react-native";
import { OfferCardStyles as styles } from "./OfferCard.style";
import { categorySlice } from "../../redux/slices/category.slice";

const OfferCard = ({ data }) => {
  const dispatch = useDispatch();
  const { selectedStore } = useSelector((state) => state.category);

  const storeName = selectedStore?.Store?.name;
  const onBtnHandler = () => {
    dispatch(categorySlice.actions.setSelectedOffer({ offer: data }));
    navigator.navigate("OfferDetailsPage");
  };

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
    const lastIndexOfSpace = str.lastIndexOf(" ");

    if (lastIndexOfSpace === -1) {
      return str;
    }

    return str ? str?.substring(0, lastIndexOfSpace) : "";
  };
  const endDate = formatDate(data?.endsAt);
  const offerFirstWord = removeLastWord(data?.shortTitle);
  const offerLastWord = data?.shortTitle?.split(" ").splice(-1);
  return (
    <TouchableOpacity onPress={onBtnHandler} style={styles.card}>
      <View style={[styles.v1, { backgroundColor }]}>
        <Text numberOfLines={2} style={styles.upsideTxt}>
          {status}
        </Text>
      </View>
      <View style={styles.v2}>
        <Text style={styles.txtRedMed}>
          {C.strings.VALID_TILL} {endDate}
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.txtDrkBg}>
          {storeName}
        </Text>
        <Text style={styles.txtDrkSm}>{data?.longTitle}</Text>
      </View>
      <View style={styles.v3}>
        <View style={[styles.absoluteTop, styles.absoluteCircle]} />
        <View style={[styles.absoluteBottom, styles.absoluteCircle]} />
        <DashComponent
          dashGap={8}
          dashLength={4}
          style={styles.dash}
          dashColor={C.colors.border.dark}
        />
        <Text numberOfLines={2} style={styles.txtSm}>
          {offerFirstWord}
        </Text>
        <Text style={styles.txtRedBg}>{offerLastWord}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OfferCard;
