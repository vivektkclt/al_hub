import React from "react";
import { C } from "../../assets";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import getStoreNameById from "../../graphql/queries/getStoreNameById";
import pngImages from "../../assets/images/png";

const HomeOfferCard = ({
  title,
  onCardHandler,
  offerValue = 0,
  priceType = "percentage",
  storeId,
  image,
}) => {
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const { data, loading, error } = useQuery(getStoreNameById, {
    context,
    fetchPolicy: "cache-and-network",
    variables: {
      storeId: storeId,
    },
  });

  const getOfferValue = () => {
    return (
      <Text
        style={[
          styles.mainTitle,
          data?.Store?.option === "service"
            ? styles.offerValueText2
            : styles.offerValueText,
        ]}
      >
        {priceType === "amount" ? offerValue : offerValue + "%"}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onCardHandler}
      style={{ marginRight: 20, height: 160, marginTop: 10 }}
    >
      <Image
        //  resizeMode="stretch"
        style={styles.image}
        source={
          image
            ? { uri: image }
            : data?.Store?.option === "service"
            ? pngImages.medicalBanner
            : pngImages.offerBG1
        }
      />
      <View style={styles.centerView}>
        <Text numberOfLines={1} style={styles.storeName}>
          {data?.Store?.name}
        </Text>
        <Text numberOfLines={2} style={styles.descTitle}>
          {title}
        </Text>
        <View style={[styles.btnContainer]}>
          <View
            style={[
              styles.visitBtn,
              {
                backgroundColor:
                  data?.Store?.option === "service"
                    ? C.colors.primary.color1
                    : C.colors.primary.primary4,
              },
            ]}
          >
            <Text
              style={[
                styles.visitBtnText,
                {
                  color:
                    data?.Store?.option === "service"
                      ? C.colors.text.secondary6
                      : C.colors.primary.color1,
                },
              ]}
            >
              {C.strings.VISIT_US}
            </Text>
          </View>
          <Text
            style={[
              styles.mainTitle,
              data?.Store?.option === "service"
                ? styles.offerText2
                : styles.offerText,
            ]}
          >
            {`AED `}
            {getOfferValue()}
            {` OFF`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeOfferCard;

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginRight: 20,
    borderRadius: 30,
    borderWidth: 1,
  },
  mainTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    color: C.colors.primary.color1,
    alignSelf: "center",
    fontFamily: C.strings.ARCHIVO_NARROW_BOLD,
  },
  descTitle: {
    fontSize: 14,
    opacity: 0.8,
    textTransform: "capitalize",
    color: C.colors.primary.color1,
    width: "70%",
    textAlign: "left",
    height: 44,
    fontFamily: C.strings.ARCHIVO_NARROW_BOLD,
    marginBottom: 10,
  },
  storeName: {
    fontSize: 25,
    textTransform: "uppercase",
    color: C.colors.primary.color1,
    // width: "75%",
    textAlign: "left",
    height: 30,
    fontFamily: C.strings.ARCHIVO_NARROW_BOLD,
    marginBottom: 5,
  },
  image: {
    height: "100%",
    flexDirection: "row",
    width: C.measures.SCREEN_WIDTH - 55,

    borderRadius: 10,
    borderWidth: 2,
  },
  centerView: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 25,
  },
  offerValueText: { color: C.colors.text.red },
  offerValueText2: { color: C.colors.text.faded },
  btnContainer: { flexDirection: "row" },
  visitBtn: {
    backgroundColor: C.colors.primary.primary4,
    height: 24,
    paddingHorizontal: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: C.measures.BORDER_RADIUS,
  },
  visitBtnText: {
    fontSize: 12,
    fontFamily: C.strings.ARCHIVO_NARROW_BOLD,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  offerText: { color: C.colors.text.black },
  offerText2: { color: C.colors.text.color1 },
});
