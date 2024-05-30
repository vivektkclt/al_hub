import moment from "moment";
import { useEffect, useState } from "react";
import { Keyboard, Linking, Platform } from "react-native";

export const checkValidEmail = (email) => {
  if (email.length == 0) {
    return false;
  } else {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      return true;
    } else {
      return false;
    }
  }
};

export const openUrl = async (url) => {
  await Linking.openURL(url);
  // Checking if the link is supported for links with custom URL scheme.
  // const supported = await Linking.canOpenURL(url);
  // if (supported) {
  //   // Opening the link with some app, if the URL scheme is "http" the web link should be opened
  //   // by some browser in the mobile
  //   await Linking.openURL(url);
  // } else {
  // }
};

export const handleMapLinking = (latitude, longitude) => {
  let c = `${longitude},${latitude}`;
  const url = Platform.select({
    ios: `http://maps.apple.com/?ll=${c}&q=Store`,
    //ios: `maps:${c}`,
    android: `geo:0,0?q=${c}(store)`,
  });
  Linking.openURL(url);
};

export const formatDate = (date) => moment(date).format("DD MMM YYYY");

export const detectKeyboardActive = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return isKeyboardVisible;
};
