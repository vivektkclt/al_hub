import { View, Text, Pressable, Modal, Image } from "react-native";
import React, { useRef } from "react";
import PhoneNumberInput from "../../components/PhoneNumberInput/PhoneNumberInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useVerifyOTP } from "../../hooks/useVerifyOTP";
import { C } from "../../assets";
import SmoothPinCodeInput from "../../components/TextInput/SmoothPinCodeInput.component";
import { mobileRegisterPageStyles as styles } from "./MobileRegisterPage.Styles";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { EditIcon, TickIcon } from "../../assets/icon/Icon";
import ResendOTP from "../../components/ResendOTP/ResendOTP.Component";
import pngImages from "../../assets/images/png";
import { useNetInfo } from "@react-native-community/netinfo";
import Offlinepage from "../OffilnePage/Offline.page";

const MobileRegisterPage = () => {
  const navigation = useNavigation();
  const OTP_LENGTH = 6;
  const { sendOTP, verifyOTP, authToken, clearToken } = useVerifyOTP({
    onOtpVerified,
    onError,
  });
  const { top } = useSafeAreaInsets();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [err, setErr] = useState({});
  const [otp, setOtp] = useState("");
  const [index, setIndex] = useState(0);
  const phoneNumber = useRef("");
  const { isConnected } = useNetInfo();
  const countryCode = useRef({
    code: "AE",
    dial_code: "+971",
    flag: "🇦🇪",
    name: {
      en: "United Arab Emirates",
    },
  });

  const phone = `${countryCode.current?.dial_code}${phoneNumber.current}`;

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

  const animatedTranslateY2 = useAnimatedStyle(() => {
    const translateY = interpolate(state.value, [1, 0], [0, 45], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      transform: [{ translateY: translateY }],
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

  const validate = () => {
    let errors = {};
    if (!phoneNumber.current) errors.phone = C.strings.REQUIRED_WARNING;
    setErr(errors);
    return Object.keys(errors).length === 0;
  };

  const validateOTP = () => {
    let errors = {};
    if (!otp) errors.otp = C.strings.OTP_REQUIRED;
    if (otp.length < OTP_LENGTH) errors.otp = C.strings.ENTER_VALID_OTP;
    setErr(errors);
    return Object.keys(errors).length === 0;
  };

  const fnSetPhoneNumber = (data) => {
    phoneNumber.current = data;
  };
  const fnSetCountryCode = (data) => {
    countryCode.current = data;
  };
  const fnOpenConfirmWindow = () => {
    if (!validate()) return;
    setShowConfirmModal(true);
  };
  const fnCloseConfirmWindow = () => {
    setShowConfirmModal(false);
  };
  const fnSendOTP = () => {
    sendOTP({
      phoneNumber: phone,
    });
    fnCloseConfirmWindow();
  };
  const fnConfirmOTP = () => {
    if (!validateOTP()) return;
    verifyOTP({ token: authToken, otp: otp });
  };
  const fnSetOTP = (data) => {
    setOtp(data);
  };

  function onOtpVerified() {
    setIndex(1);
  }
  function onError() {
    setErr({ otp: "invalid otp" });
  }
  const completeVerification = () => {
    navigation.navigate("AccountRegisterPage", {
      contact: phone,
    });
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <Modal
        transparent
        statusBarTranslucent
        collapsable
        visible={showConfirmModal}
        animationType="slide"
        children={
          <ConfirmModal
            onCancel={fnCloseConfirmWindow}
            onConfirm={fnSendOTP}
            phoneNumber={phone}
          />
        }
        onRequestClose={fnCloseConfirmWindow}
      />
      {!isConnected ? (
        <Offlinepage />
      ) : (
        <View style={[styles.container]}>
          {showConfirmModal && <View style={[styles.shadedBackground]} />}
          <View style={[styles.progressContainer, { top: top * 3 }]}>
            <View style={[styles.progressWrapper]}>
              <Tick condition={true} />
              <Line condition={authToken.length > 0} />
              <Tick condition={authToken.length > 0} />
              <Line condition={index === 1} />
              <Tick condition={index === 1} />
            </View>
            {index === 0 ? (
              <View style={[styles.otpScreenContainer]}>
                <View style={[styles.otpTitleContainer]}>
                  <Text style={[styles.titleText]}>
                    {C.strings.ENTER_PHONE}
                  </Text>
                  <Text style={[styles.description]}>
                    {C.strings.ENTER_PHONE_DESCRIPTION}
                  </Text>
                </View>
                <View style={[styles.otpComponent]}>
                  <Animated.View
                    style={[animatedOpacity, styles.editPhoneIconContainer]}
                  >
                    <Pressable onPress={clearToken}>
                      <EditIcon width="15" height="15" />
                    </Pressable>
                  </Animated.View>
                  <Animated.View style={[animatedTop]}>
                    <PhoneNumberInput
                      setPh={fnSetPhoneNumber}
                      setCC={fnSetCountryCode}
                      hideShadow={authToken}
                      disabled={authToken}
                      error={err?.phone}
                    />
                  </Animated.View>
                  <Animated.View
                    pointerEvents={authToken ? "auto" : "none"}
                    style={[
                      animatedTranslateY2,
                      animatedOpacity,
                      styles.otpInputContainer,
                    ]}
                  >
                    <SmoothPinCodeInput
                      codeLength={OTP_LENGTH}
                      cellSpacing={5}
                      cellSize={35}
                      animated={false}
                      cellStyle={styles.inputBox}
                      containerStyle={styles.inputContainer}
                      value={otp}
                      onTextChange={fnSetOTP}
                    />
                    <ResendOTP
                      token={authToken}
                      onClick={fnSendOTP}
                      message={"dont recieved the code?"}
                      showMessage
                    />
                    <Text style={[styles.errorText]}>{err?.otp}</Text>
                  </Animated.View>
                </View>
                <View style={[styles.btnContainer]}>
                  <Pressable
                    onPress={goBack}
                    style={[styles.btnCommonStyle, styles.cancelBtn]}
                  >
                    <Text style={[styles.cancelbtnText]}>
                      {C.strings.CANCEL}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={authToken ? fnConfirmOTP : fnOpenConfirmWindow}
                    style={[styles.btnCommonStyle, styles.mainBtn]}
                  >
                    <Text style={[styles.mainBtnText]}>
                      {authToken ? C.strings.CONFIRM : C.strings.NEXT}
                    </Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <>
                <View style={[styles.successScreenContainer]}>
                  <View style={[styles.successScreenWrapper]}>
                    <Image
                      source={pngImages.verified}
                      style={[styles.imageStyle]}
                    />
                    <Text style={[styles.successTitile]}>
                      {C.strings.VERIFICATION_SUCCESS}
                    </Text>
                    <Text style={[styles.successDescription]}>
                      {C.strings.VERIFY_SUCCESS_DESCRIPTION}
                    </Text>
                  </View>
                  <Pressable
                    onPress={completeVerification}
                    style={[styles.continueBtn, { top: -3 * top }]}
                  >
                    <Text style={[styles.continueBtnText]}>
                      {C.strings.CONTINUE}
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const Tick = ({ condition }) => (
  <View
    style={[
      styles.iconContainer,
      {
        borderColor: condition
          ? C.colors.primary.secondary
          : C.colors.primary.color2,
        backgroundColor: condition
          ? C.colors.primary.secondary
          : C.colors.primary.color1,
      },
    ]}
  >
    <TickIcon
      fillColor={condition ? C.colors.primary.color1 : C.colors.primary.color2}
    />
  </View>
);

const Line = ({ condition }) => (
  <View
    style={[
      styles.line,
      {
        backgroundColor: condition
          ? C.colors.primary.secondary
          : C.colors.primary.color2,
      },
    ]}
  />
);

const ConfirmModal = ({ phoneNumber = 999, onConfirm, onCancel }) => {
  return (
    <View style={[styles.confirmModalContainer]}>
      <View style={[styles.confirmationDialogContainer]}>
        <View style={[styles.dialogTitleContainer]}>
          <Text style={[styles.confirmTitleText]}>
            {C.strings.ASK_TO_CONTINUE}
          </Text>
          <Text style={[styles.otpDialogDescription]}>
            {C.strings.OTP_DESCRIPTION}
          </Text>
          <Text style={[styles.phoneNumber]}>{phoneNumber}</Text>
        </View>
        <View style={[styles.btnContainer]}>
          <Pressable
            onPress={onCancel}
            style={[styles.cancelBtn, styles.btnCommonStyle]}
          >
            <Text style={[styles.cancelbtnText]}>{C.strings.CANCEL}</Text>
          </Pressable>
          <Pressable
            onPress={onConfirm}
            style={[styles.btnCommonStyle, styles.mainBtn]}
          >
            <Text style={[styles.mainBtnText]}>{C.strings.NEXT}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MobileRegisterPage;
