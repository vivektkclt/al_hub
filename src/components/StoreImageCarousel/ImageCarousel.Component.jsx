import { View } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { C } from "../../assets";
import { storeStyles as styles } from "../../pages/Store/Store.style";
import SwipableImageCard from "../../components/ImageContainer/SwipableImageCard";
import { useState } from "react";
const ImageCarouselComponent = ({ data }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const HEADER_IMAGE_WIDTH = C.measures.SCREEN_WIDTH;
  const HEADER_IMAGE_HEIGHT = C.measures.SCREEN_HEIGHT / 3;

  const images = [];
  if (data) {
    for (const image of data) {
      const imageUrl = image?.location;
      images.push({ url: imageUrl });
    }
    if (images?.length > 1) {
      images.shift();
    }
  } else {
    images.push({
      image: require("../../assets/images/defaultStoreBanner.png"),
    });
  }

  const getObjectsWithNonImageClassification = () => {
    return data
      ?.filter((item) => item.classification !== "image")
      .map((item) => ({ url: item.location }));
  };
  const renderImages = ({ item, index }) => (
    <SwipableImageCard item={item} imageStyle={styles.image} />
  );
  const onImageChanges = (index) => setActiveImageIndex(index);
  return (
    <>
      <Carousel
        loop
        // autoPlay
        data={getObjectsWithNonImageClassification()}
        renderItem={renderImages}
        width={HEADER_IMAGE_WIDTH}
        height={HEADER_IMAGE_HEIGHT}
        onScrollEnd={onImageChanges}
        scrollAnimationDuration={1000}
      />
      <View style={styles.paginator}>
        {images
          ? images?.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.imageIcon,
                  idx === activeImageIndex ? styles.activeImage : null,
                ]}
              />
            ))
          : null}
      </View>
    </>
  );
};

export default ImageCarouselComponent;
