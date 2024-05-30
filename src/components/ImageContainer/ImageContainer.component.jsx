import { C } from "../../assets";
import React, { useState } from "react";
import { CameraIcon, DeleteIcon } from "../../assets/images";
import SkeltonLoader from "../Loaders/SkeltonLoader.component";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const ImageContainer = ({
  uri,
  name,
  loader,
  showCamera,
  showDelete,
  onImgHandler,
}) => {
  const onLoadEnd = () => setLoading(false);
  const onLoadStart = () => setLoading(true);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Pressable style={[styles.imgWraper]} onPress={onImgHandler}>
        {loading && <SkeltonLoader style={[styles.img, styles.absolute]} />}
        {loader ? (
          <SkeltonLoader style={styles.img} />
        ) : uri !== undefined ? (
          <Image
            source={{ uri }}
            style={styles.img}
            resizeMode={"cover"}
            onLoadEnd={onLoadEnd}
            onLoadStart={onLoadStart}
          />
        ) : (
          <View style={[styles.empty, styles.img]}>
            <Text style={styles.txt}>{name?.charAt(0)}</Text>
          </View>
        )}
        {showCamera && (
          <View style={[styles.absolute, styles.cam]}>
            <CameraIcon />
          </View>
        )}
        {showDelete && (
          <Pressable
            onPress={onImgHandler}
            style={[styles.absolute, styles.del]}
          >
            <DeleteIcon />
          </Pressable>
        )}
      </Pressable>
    </>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  imgWraper: {
    width: 102,
    height: 102,
    borderWidth: 1,
    borderRadius: 90,
    borderColor: C.colors.border.dark,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 90,
  },
  empty: {
    alignItems: "center",
    backgroundColor: C.colors.primary.color2,
    justifyContent: "center",
  },
  txt: {
    fontSize: 24,
    fontWeight: "600",
    textTransform: "uppercase",
    color: C.colors.primary.color1,
  },
  absolute: {
    position: "absolute",
  },
  cam: {
    bottom: 5,
    paddingLeft: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  del: {
    top: -10,
    right: 10,
    width: 30,
    height: 30,
    paddingLeft: 3,
    borderRadius: 90,
    alignItems: "center",
    backgroundColor: C.colors.text.red,
    justifyContent: "center",
  },
});
