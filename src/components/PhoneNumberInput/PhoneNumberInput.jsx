import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import { CountryPicker } from "react-native-country-codes-picker";
import EmptyInputWarningComponent from "../EmptyInputWarning/EmptyInputWarning.Component";
import { C } from "../../assets";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { commonStyles } from "../../styles";
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const PhoneNumberInput = ({
  setCC,
  setPh,
  error,
  onFocus,
  disabled = false,
  hideShadow = false,
}) => {
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState({
    code: "AE",
    dial_code: "+971",
    flag: "🇦🇪",
    name: {
      en: "United Arab Emirates",
    },
  });
  const fnSetPhoneNumber = (value) => {
    if (value == "") {
      setPhone(value);
      setPh(value);
      return;
    }
    if (!validatePhoneNumber(value)) return;
    setPhone(value);
    setPh(value);
  };
  const fnSetCountryCode = (item) => {
    setCountryCode(item);
    setShow(false);
    setCC(item);
  };
  const validatePhoneNumber = (input) => {
    const regex = /^[0-9]+$/;
    return regex.test(input);
  };
  const hideCC = () => {
    setShow(false);
  };
  const showCC = () => {
    setShow(true);
  };

  const state = useDerivedValue(() => {
    return disabled
      ? withTiming(1, { duration: 300 })
      : withTiming(0, { duration: 300 });
  });

  const animatedFontSize = useAnimatedStyle(() => {
    const top = interpolate(state.value, [1, 0], [12, 16], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      fontSize: top,
    };
  });

  return (
    <>
      <CountryPicker
        style={[styles.countryPicker]}
        initialState="+971"
        show={show}
        onRequestClose={hideCC}
        onBackdropPress={hideCC}
        pickerButtonOnPress={fnSetCountryCode}
      />
      <Pressable
        pointerEvents={disabled ? "none" : undefined}
        style={[styles.textInput, hideShadow ? "" : styles.showShadow]}
      >
        <View style={[styles.container]}>
          <Pressable onPress={showCC} style={[styles.wrapper]}>
            <Animated.Text style={[animatedFontSize]}>
              {countryCode.flag || ""}
            </Animated.Text>
            <Animated.Text style={[animatedFontSize, styles.fontColor]}>
              {countryCode.dial_code || "code"}
            </Animated.Text>
          </Pressable>
        </View>
        <View style={[styles.inputContainer]} />
        <AnimatedTextInput
          editable={!disabled}
          // onChange={() => setErr((prev) => ({ ...prev, phone: "" }))}
          onFocus={onFocus}
          style={[animatedFontSize, styles.fontColor, commonStyles.align.flex1]}
          value={phone}
          placeholder="phone number"
          keyboardType="phone-pad"
          onChangeText={fnSetPhoneNumber}
        />
        {error && (
          <EmptyInputWarningComponent warning={error} left={25} top={50} />
        )}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  errTextStyle: {
    position: "absolute",
    bottom: -7,
    left: 30,
    backgroundColor: C.colors.primary.color1,
    color: C.colors.text.red,
    fontSize: 12,
  },
  textInput: {
    width: "95%",
    paddingLeft: 10,
    height: 60,
    borderStyle: "solid",
    marginTop: 20,
    fontSize: 20,
    alignSelf: "center",
    backgroundColor: C.colors.primary.color1,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  showShadow: {
    elevation: 3,
    shadowColor: C.colors.bg.shadow1,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    borderBottomWidth: 0.2,
    borderColor: C.colors.border.dark,
    shadowOffset: { width: 1, height: 1 },
  },
  singleLineTextNor: { borderColor: C.colors.primary.color2 },
  singleLineTextErr: { borderColor: C.colors.text.red, borderBottomWidth: 0.8 },
  container: {
    height: 50,
    justifyContent: "center",
  },
  wrapper: {
    height: 30,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  countryPicker: {
    textInput: { width: "100%" },
    modal: {
      height: "70%",
    },
  },
  flag: { fontSize: 16 },
  number: { fontSize: 16 },
  disabledFlag: {
    fontSize: 12,
  },
  disabledNumber: { fontSize: 12 },
  inputContainer: {
    height: "40%",
    borderRightWidth: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  fontColor: { color: C.colors.text.black },
});

export default PhoneNumberInput;
