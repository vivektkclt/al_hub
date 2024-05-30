import { C } from "../../assets";
import { commonStyles } from "../../styles";
import Rating from "react-native-easy-rating";
import React, { useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SkeltonLoader from "../Loaders/SkeltonLoader.component";

const ReviewCard = ({ data }) => {
  const [loader, setLoader] = useState(false);
  const renderImages = useMemo(() => {
    return data?.ReviewImages?.map((tile, index) => {
      return (
        <Image
          key={index}
          resizeMode="cover"
          style={styles.reviewImg}
          source={{ uri: tile?.location }}
        />
      );
    });
  }, [data?.ReviewImages]);

  return (
    <View style={[commonStyles.align.row, styles.mainView]}>
      <View style={styles.v1}>
        {loader && <SkeltonLoader style={[styles.img, styles.absolute]} />}
        {data?.User?.image ? (
          <Image
            resizeMode="cover"
            style={styles.img}
            onLoadEnd={() => setLoader(false)}
            onLoadStart={() => setLoader(true)}
            source={{ uri: data?.User?.image?.location }}
          />
        ) : (
          <View style={[styles.img, styles.emptyImg]}>
            <Text style={styles.txtWhte}>
              {data?.User?.firstName?.charAt(0)}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.v2}>
        <Text style={styles.txtDrk}>
          {data?.User?.firstName} {data?.User?.lastName}
        </Text>
        {/* <Text style={styles.txtBrwn}>{`${data?.rating || 0} ${
          C.strings.REVIEWS
        }`}</Text> */}
        <Text style={styles.txtDrk}>{data?.description}</Text>
        <Rating
          max={5}
          iconWidth={12}
          iconHeight={12}
          editable={false}
          rating={data?.rating}
        />
        {data?.ReviewImages?.length > 0 && (
          <View style={[commonStyles.align.row, styles.spacer]}>
            {renderImages}
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  mainView: {
    padding: 10,
    marginBottom: 10,
    alignSelf: "center",
    borderBottomWidth: 0.2,
    borderColor: C.colors.border.grey,
  },
  v1: {
    flex: 1.8,
    alignItems: "center",
  },
  v2: {
    flex: 9.2,
    justifyContent: "center",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 90,
  },
  emptyImg: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.colors.primary.color2,
  },
  txtWhte: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    color: C.colors.primary.color1,
  },
  txtDrk: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "700",
    letterSpacing: -0.8,
    color: C.colors.text.darkGry,
  },
  txtBrwn: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "600",
    letterSpacing: -0.8,
    textTransform: "lowercase",
    color: C.colors.primary.color,
  },
  reviewImg: {
    width: 90,
    height: 90,
    marginRight: 8,
    borderRadius: C.measures.BORDER_RADIUS,
  },
  spacer: {
    marginTop: 10,
  },
  absolute: {
    position: "absolute",
  },
});
