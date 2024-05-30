import { Text, TouchableOpacity, Platform, Image } from "react-native";
import React from "react";
import Tooltip from "react-native-walkthrough-tooltip";
import pngImages from "../../assets/images/png";
import { storeStyles as styles } from "../../pages/Store/Store.style";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import strings from "../../assets/values/strings";
import { C } from "../../assets";

const StoreInfoButtonComponent = ({
  text,
  btnHeight = 50,
  btnWidth = 50,
  imageHeight = 25,
  imageWidth = 25,
}) => {
  const [menuTip, setMenuTip] = useState(false);
  const { top } = useSafeAreaInsets();
  return (
    <Tooltip
      isVisible={menuTip}
      placement="top"
      onClose={() => {
        setMenuTip(false);
      }}
      topAdjustment={Platform.OS === "android" ? -top : 0}
      content={
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            textAlign: "center",
            color: C.colors.text.black,
          }}
        >
          {text || strings.CREDIT_TXT}
        </Text>
      }
    >
      <TouchableOpacity
        style={[styles.infoBtn, { height: btnHeight, width: btnWidth }]}
        onPress={() => setMenuTip(true)}
      >
        <Image
          style={[styles.toolIcon, { height: imageHeight, width: imageWidth }]}
          source={pngImages.infoIcon}
        />
      </TouchableOpacity>
    </Tooltip>
  );
};

export default StoreInfoButtonComponent;
