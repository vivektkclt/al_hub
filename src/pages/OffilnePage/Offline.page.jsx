import { View, Text, Image, Pressable, Platform } from "react-native";
import React from "react";
import pngImages from "../../assets/images/png";
import { C } from "../../assets";
import { useNetInfo } from "@react-native-community/netinfo";
import CustomStatusBar from "../../components/StatusBar/CustomStatusBar.component";

const OfflineComponent = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: C.colors.primary.color1,
        }}
      >
        <Image
          source={pngImages.noNetworkIcon}
          style={{ width: 75.72, height: 59.77, marginBottom: 24 }}
        />
        <Text
          style={{
            fontWeight: "bold",
            color: C.colors.text.grey,
            fontSize: 20,
            textTransform: "capitalize",
            marginBottom: 22,
            fontFamily: C.strings.ARCHIVO_NARROW_BOLD,
          }}
        >
          no internet connection
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: C.colors.text.dark,
            fontSize: 16,
            textTransform: "capitalize",
            marginBottom: 24,
            fontFamily: C.strings.ARCHIVO_NARROW_BOLD,
          }}
        >
          Please check your internet connection!
        </Text>
        {/*  <Pressable
          style={{
            width: 148,
            borderRadius: C.measures.BORDER_RADIUS,
            overflow: "hidden",
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={pngImages.smallButtonBackground}
            style={{
              width: 148,
              height: 40,
              objectFit: "contain",
              borderRadius: C.measures.BORDER_RADIUS,
              position: "absolute",
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              color: C.colors.text.color1,
              fontSize: 16,
              textTransform: "capitalize",
              fontFamily: C.strings.ARCHIVO_NARROW_BOLD,
            }}
          >
            tap to retry
          </Text>
        </Pressable> */}
      </View>
    </>
  );
};

const Offlinepage = ({ children }) => {
  return <OfflineComponent />;
};

export default Offlinepage;
