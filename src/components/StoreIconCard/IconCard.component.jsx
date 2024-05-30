import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { storeStyles as styles } from "../../pages/Store/Store.style";
import { C } from "../../assets";

const IconCardComponent = ({
  disabled = false,
  icon,
  height,
  onIconHandler,
  iconStyle,
  text = "",
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[
      styles.tabIcon,
      iconStyle ?? null,
      {
        height,
        backgroundColor: disabled ? "grey" : "black",
      },
    ]}
    onPress={onIconHandler}
  >
    <>
      {text ? (
        <Text
          style={{
            color: C.colors.primary.color1,
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          {text}
        </Text>
      ) : (
        icon
      )}
    </>
  </TouchableOpacity>
);

export default IconCardComponent;
