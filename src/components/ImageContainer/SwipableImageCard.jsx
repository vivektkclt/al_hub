import React from "react";
import { Image } from "react-native";
import FastImage from "react-native-fast-image";

const SwipableImageCard = ({ item, imageStyle }) => (
  <>
    {item?.url ? (
      <FastImage
        style={imageStyle}
        resizeMode={FastImage.resizeMode.cover}
        source={{
          uri: item?.url,
          priority: FastImage.priority.normal,
        }}
      />
    ) : (
      <Image source={item?.image} resizeMode={"cover"} style={imageStyle} />
    )}
  </>
);

export default SwipableImageCard;
