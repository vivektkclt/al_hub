import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { C } from "../../assets";
import PhoneNumberInput from "../PhoneNumberInput/PhoneNumberInput";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { detectKeyboardActive } from "../../utils/functions";
import { useVerifyOTP } from "../../hooks/useVerifyOTP";
import { useRef } from "react";
import ResendOTP from "../ResendOTP/ResendOTP.Component";
import SmoothPinCodeInput from "../TextInput/SmoothPinCodeInput.component";
import smsPermission from "../../functions/readMessagePermission";
import { useEffect } from "react";
const MobileOTPVerificationComponent = ({ onVerified, onClose }) => {
  const isKeyBoardActive = detectKeyboardActive();
  const SCREEN_WIDTH = C.measures.SCREEN_WIDTH;
  const OTP_LENGTH = 6;
  const SIZE = SCREEN_WIDTH - 80;
  const { sendOTP, verifyOTP, loading, authToken, clearToken } = useVerifyOTP({
    onOtpVerified,
    onError,
  });
  const [inputOTP, setOTP] = useState("");
  const [err, setErr] = useState({});
  const otpBtnRef = useRef(null);
  const otpInputRef = useRef(null);
  const phoneNumber = useRef("");
  const countryCode = useRef({
    code: "AE",
    dial_code: "+971",
    flag: "🇦🇪",
    name: {
      en: "United Arab Emirates",
    },
  });

  useEffect(() => {
    smsPermission();
  }, []);
  useEffect(() => {
    if (authToken) {
      otpInputRef.current.focus();
    }
  }, [authToken]);

  function onOtpVerified() {
    onVerified(`${countryCode.current?.dial_code}${phoneNumber.current}`);
  }
  function onError() {
    setErr({ otp: "invalid otp" });
  }
  const fnSetOTP = (data) => {
    setOTP(data);
  };

  const fnSendOTP = () => {
    otpBtnRef.current.focus();
    if (!validate()) return;
    sendOTP({
      phoneNumber: `${countryCode.current?.dial_code}${phoneNumber.current}`,
    });
  };
  const fnConfirmOTP = () => {
    if (!validateOTP()) return;
    verifyOTP({ token: authToken, otp: inputOTP });
  };
  const validateOTP = () => {
    let errors = {};
    if (!inputOTP) errors.otp = " * otp required";
    if (inputOTP.length < 6) errors.otp = "* Please enter valid otp";
    setErr(errors);
    return Object.keys(errors).length === 0;
  };
  const validate = () => {
    let errors = {};
    if (!phoneNumber.current) errors.phone = " * this field is required";
    setErr(errors);

    return Object.keys(errors).length === 0;
  };

  const fnSetPhoneNumber = (data) => {
    data &&
      setErr((prev) => {
        const { phone, ...rest } = prev;
        return rest;
      });
    phoneNumber.current = data;
  };

  const fnSetCountryCode = (data) => {
    countryCode.current = data;
  };

  const state = useDerivedValue(() => {
    return authToken
      ? withTiming(1, { duration: 300 })
      : withTiming(0, { duration: 300 });
  });

  const animatedTop = useAnimatedStyle(() => {
    const top = interpolate(state.value, [1, 0], [-35, 15], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      top: top,
    };
  });
  const animatedTranslateY = useAnimatedStyle(() => {
    const translateY = interpolate(state.value, [1, 0], [-45, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      transform: [{ translateY: translateY }],
    };
  });
  const animatedTranslateY2 = useAnimatedStyle(() => {
    const translateY = interpolate(state.value, [1, 0], [0, 45], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      transform: [{ translateY: translateY }],
    };
  });
  const animatedBottom = useAnimatedStyle(() => {
    const bottom = interpolate(state.value, [1, 0], [0, 75], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      transform: [{ translateY: bottom }],
    };
  });
  const animatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(state.value, [1, 0], [1, 0], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      opacity: opacity,
    };
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: C.colors.primary.color1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={"padding"}
        style={{
          width: "100%",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <Image
              style={{
                width: SIZE,
                objectFit: "cover",
                height: SIZE - 50,
              }}
              source={require("../../assets/images/jpeg/otp.jpg")}
            />
            <Text
              style={{
                marginBottom: 20,
                fontSize: 20,
                color: C.colors.text.faded,
              }}
            >
              Register Phone Number
            </Text>
          </View>
          <View style={{ height: 130, width: "100%" }}>
            <Animated.View
              style={[
                animatedTop,
                { width: "100%", position: "absolute", height: 130 },
              ]}
            >
              <PhoneNumberInput
                hideShadow
                disabled={authToken.length > 0}
                setCC={fnSetCountryCode}
                setPh={fnSetPhoneNumber}
                error={err.phone}
              />
            </Animated.View>
            <Animated.View
              pointerEvents={authToken ? "auto" : "none"}
              style={[
                animatedTranslateY2,
                animatedOpacity,
                {
                  width: "100%",
                  height: 130,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 30,
                  backgroundColor: C.colors.primary.color1,
                  alignItems: "center",
                  width: 260,
                }}
              >
                <SmoothPinCodeInput
                  ref={otpInputRef}
                  codeLength={OTP_LENGTH}
                  cellSpacing={5}
                  cellSize={35}
                  animated={false}
                  cellStyle={styles.inputBox}
                  containerStyle={styles.inputContainer}
                  value={inputOTP}
                  onTextChange={fnSetOTP}
                  textContentType="oneTimeCode"
                  autoComplete="sms-otp"
                />
                {err?.otp && (
                  <View
                    style={{
                      width: "100%",
                      position: "absolute",
                      top: 40,
                      backgroundColor: C.colors.primary.color1,
                      paddingHorizontal: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: C.colors.text.red,
                        fontSize: 12,
                      }}
                    >
                      {err?.otp}
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>
            <Animated.View
              style={[
                animatedBottom,
                animatedOpacity,
                {
                  position: "absolute",
                  bottom: 0,
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                },
              ]}
            >
              <Pressable onPress={clearToken}>
                <Text style={{ color: C.colors.text.secondary6, fontSize: 12 }}>
                  edit phone number
                </Text>
              </Pressable>
              <ResendOTP onClick={fnSendOTP} token={authToken} />
            </Animated.View>
          </View>
          <View
            style={{
              width: "95%",
              overflow: "hidden",
              height: 45,
              marginTop: 30,
              borderRadius: 10,
              backgroundColor: C.colors.primary.color4,
            }}
          >
            <Animated.View style={[animatedTranslateY, { width: "100%" }]}>
              <Pressable
                ref={otpBtnRef}
                onPress={fnSendOTP}
                style={{
                  width: "100%",
                  height: 45,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: C.colors.text.color1, fontWeight: "bold" }}
                >
                  Send OTP
                </Text>
              </Pressable>
              <Pressable
                onPress={fnConfirmOTP}
                style={{
                  width: "100%",
                  height: 45,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: C.colors.primary.color4,
                }}
              >
                <Text
                  style={{ color: C.colors.text.color1, fontWeight: "bold" }}
                >
                  Confirm
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        </View>
        {!isKeyBoardActive && (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Pressable
              onPress={onClose}
              style={{
                width: "95%",
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: C.colors.text.black, fontWeight: "bold" }}>
                Cancel
              </Text>
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: { borderRadius: 10, borderWidth: 1 },
  inputContainer: { alignSelf: "center", marginBottom: 20 },
});
export default MobileOTPVerificationComponent;
