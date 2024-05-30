import React from "react";
import { C } from "../../assets";
import { StyleSheet, View } from "react-native";
import { AlhubSpalshLogo } from "../../assets/images";
import * as Animatable from "react-native-animatable";
import CustomStatusBar from "../../components/StatusBar/CustomStatusBar.component";

const SplashPage = () => (
  <>
    <View style={styles.v1}>
      <Animatable.View animation="zoomIn" duration={1000}>
        <AlhubSpalshLogo />
      </Animatable.View>
    </View>
    <CustomStatusBar />
  </>
);

export default SplashPage;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.colors.primary.color1,
  },
});
