import { C } from "../../assets";
import React, { useMemo } from "react";
import { useState } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import colors from "../../assets/values/colors";
import { BlurView } from "@react-native-community/blur";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import PdfViewer from "../../pages/StoreDetails/pages/PdfViewer";
const HEADER_IMAGE_HEIGHT = 100;
const HEADER_IMAGE_WIDTH = C.measures.SCREEN_WIDTH - 20;
const CAROUSAL_WIDTH = C.measures.SCREEN_WIDTH;
const CAROUSAL_HEIGHT = C.measures.SCREEN_HEIGHT / 3;

const ServiceCard = ({ data }) => {
  console.log(data, "data services");
  const [expanded, setExpanded] = useState([]);
  const [visible, setVisible] = useState(false);
  const [zoomImg, setZoomImg] = useState("");

  const renderServiceCards = (tile, idx) => {
    let source;

    if (tile.length < 1) {
      source = require("../../assets/images/defaultStoreBanner.png");
    } else {
      source = { uri: tile[0]?.location };
      console.log(tile[0]?.location, "location");
      if (source?.uri === undefined) {
        source = require("../../assets/images/defaultStoreBanner.png");
      }
    }
    console.log(source, "tile");
    const openImage = () => {
      setZoomImg(source);
      setVisible(true);
    };
    console.log(zoomImg, "zi");
    return (
      <View
        key={idx}
        style={[
          styles.mb15,
          expanded[idx] ? styles.expanded : styles.notExpanded,
          styles.viewRow,
        ]}
      >
        <TouchableOpacity onPress={openImage} style={styles.imageContainer}>
          <Image
            source={{ uri: tile[0]?.location }}
            resizeMode="cover"
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={[styles.mb15, styles.colView]}>
          <View>
            <Text style={[styles.txt, styles.font15]}>{data?.title}</Text>
            <Text ellipsizeMode="tail" style={styles.txt}>
              {data?.description?.length > 65 && !expanded[idx]
                ? data?.description.substring(0, 62) + "..."
                : data?.description}
            </Text>
            {data?.description?.length > 65 ? (
              <View style={{ width: "100%", alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => {
                    const tempExpanded = [...expanded];
                    tempExpanded[idx] = tempExpanded[idx] ? false : true;
                    setExpanded(tempExpanded);
                  }}
                >
                  <Text
                    style={{
                      right: 0,
                      fontSize: 12,
                      color: colors.primary.secondary,
                      paddingTop: expanded[idx] ? 12 : 0,
                    }}
                  >
                    {expanded[idx] ? "Read less..." : "Read More.."}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <Text style={[styles.descTxt]}>AED {data?.price}</Text>
        </View>
        {tile ? (
          <Modal
            onRequestClose={() => setVisible(false)}
            visible={visible}
            transparent={true}
          >
            <BlurView blurAmount={8} style={styles.zoomBlur}>
              <View style={styles.zoomContainer}>
                <View style={[styles.zoomImgContainer]}>
                  <ReactNativeZoomableView maxZoom={5}>
                    <Image
                      source={zoomImg}
                      resizeMode="contain"
                      style={styles.zoomedImg}
                    />
                  </ReactNativeZoomableView>
                </View>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setVisible(false)}
                >
                  <Text
                    style={{
                      color: C.colors.text.color1,
                      textTransform: "capitalize",
                    }}
                  >
                    {C.strings.CLOSE}
                  </Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Modal>
        ) : null}
      </View>
    );
  };

  return (
    <>
      <Text style={styles.header}>{data?.title}</Text>
      {data?.serviceImages?.length > 0 && renderServiceCards && (
        <React.Fragment>
          {renderServiceCards(data?.serviceImages)}
        </React.Fragment>
      )}
    </>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  imageContainer: {
    width: 130,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    maxHeight: 150,
  },
  image: { height: "100%", width: "100%" },
  carImages: {
    width: CAROUSAL_WIDTH,
    height: CAROUSAL_HEIGHT,
  },
  txt: {
    fontSize: 11,
    fontWeight: "600",
    color: C.colors.text.darkGry,
  },
  font15: {
    fontSize: 15,
    marginBottom: 2,
  },
  mb15: {
    marginBottom: 15,
  },
  colView: {
    padding: 5,
    width: HEADER_IMAGE_WIDTH - 140,
    justifyContent: "space-between",
  },
  pb15: {
    paddingBottom: 15,
  },
  viewRow: {
    borderRadius: 5,
    borderWidth: 0.5,
    alignSelf: "center",
    flexDirection: "row",
    borderColor: "#DADADA",
    width: HEADER_IMAGE_WIDTH,
    shadowColor: C.colors.primary.color2,
    elevation: Platform.OS === "ios" ? 4 : 0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  notExpanded: {
    height: HEADER_IMAGE_HEIGHT + 10,
  },
  expanded: {
    minHeight: HEADER_IMAGE_HEIGHT,
  },
  descTxt: {
    fontSize: 12,
    fontWeight: "600",
    color: C.colors.text.dark,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "400",
    color: C.colors.text.darkGry,
    fontFamily: "Poppins-Regular",
  },
  imageClose: {
    // top: "10%",
    backgroundColor: "red",
    position: "absolute",
    // width: "20%",
    alignSelf: "flex-end",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeTxt: { color: "white", fontWeight: "bold" },
  zoomedImg: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    alignSelf: "flex-end",
    // backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
    flex: 0.1,
  },
  zoomContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0)",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomImgContainer: {
    height: "70%",
    width: "100%",
    // backgroundColor: "yellow",
  },
  zoomBlur: {
    flex: 1,
    maxHeight: C.measures.SCREEN_HEIGHT,
    justifyContent: "center",
  },
});
