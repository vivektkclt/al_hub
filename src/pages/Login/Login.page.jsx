import React from "react";
import { C } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { commonStyles } from "../../styles";
import { openUrl } from "../../utils/functions";
import { useRoute } from "@react-navigation/native";
import { navigator } from "../../routes/navigations";
import { loginStyle as styles } from "./Login.style";
import { getDeviceId } from "react-native-device-info";
import useAuthHandler from "../../hooks/useAuthHandler";
import { authSlice } from "../../redux/slices/auth.slice";
import { PRIVACY_POLICY_LINK } from "../../utils/utilConfigs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AlhubLogo, AppleIcon, GoogleIcon } from "../../assets/images";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";

import CustomStatusBar from "../../components/StatusBar/CustomStatusBar.component";
import InputBox from "../../components/InputField/InputField.Component";
import { useRef } from "react";
import { AccountIcon, LockIcon } from "../../assets/icon/Icon";

const sliderImage = require("../../assets/images/jpeg/login_page.jpeg");

const Chip = ({ icon, text, onHandler }) => (
  <TouchableOpacity
    style={[commonStyles.align.row, styles.btn]}
    onPress={onHandler}
  >
    {icon}
    <Text style={styles.drkTxt}>{text}</Text>
  </TouchableOpacity>
);

const LoginPage = () => {
  const dispatch = useDispatch();
  const deviceId = getDeviceId();
  const route = useRoute();
  const { top } = useSafeAreaInsets();
  const { onGoogleLoginHandler, onAppleButtonPress } = useAuthHandler();
  const onTermsHandler = () => openUrl(PRIVACY_POLICY_LINK);
  const { authLoader } = useSelector((state) => state.auth);
  const onSkip = () => {
    if (route?.params?.prev) {
      navigator.navigate(route?.params?.prev);
    } else {
      dispatch(authSlice.actions.setLoginLoader());
      dispatch(authSlice.actions.guestLogin({ body: { deviceId } }));
    }
  };
  const onRegister = () => {
    navigator.navigate("MobileRegisterPage");
  };

  const username = useRef("");
  const password = useRef("");

  const userNamrRef = useRef();
  const passwordRef = useRef();

  const fnFocusPasswordRef = () => {
    passwordRef.current.focus();
  };
  const fnSetUsername = (data) => {
    console.log(data);
    username.current = data;
  };
  const fnSetPassword = (data) => {
    password.current = data;
  };

  const onLogin = () => {
    console.log(username.current, password.current, "username and password");

    dispatch(authSlice.actions.setLoginLoader());
    dispatch(
      authSlice.actions.loginWithCredentials({
        body: { email: username.current, password: password.current },
      })
    );
  };

  return (
    <>
      {authLoader && (
        <View pointerEvents="none" style={[styles.loginActivityContainer]}>
          <ActivityIndicator
            size={"large"}
            collapsable
            color={C.colors.primary.color1}
            style={[styles.loginActivity]}
          />
        </View>
      )}
      <CustomStatusBar enableTop={false} barStyle={"light-content"} />
      <ImageBackground
        resizeMode={"cover"}
        source={sliderImage}
        style={[styles.image]}
        imageStyle={{}}
      >
        <View style={[styles.container]}>
          <TouchableOpacity onPress={onSkip} style={[styles.skipBtn, { top }]}>
            <Text style={styles.skipTxt}>{C.strings.SKIP}</Text>
          </TouchableOpacity>
          <View>
            <View style={styles.txtView}>
              <AlhubLogo />
            </View>
            <View style={[styles.tagContainer]}>
              <Text style={[styles.tagTxt]}>Connecting you to the best</Text>
            </View>
          </View>
          <View style={[styles.authContainer]}>
            <View style={[commonStyles.align.alignCenter]}>
              <InputBox
                title={C.strings.ACCOUNT}
                inputStyles={styles.textInput}
                placeholder={C.strings.ENTER_USER}
                containerStyles={styles.textInputContainer}
                ref={userNamrRef}
                returnKeyType="next"
                onSubmitEditing={fnFocusPasswordRef}
                onChangeText={fnSetUsername}
                titleStyle={styles.textInputTitleStyle}
                placeholderTextColor={C.colors.text.color1}
                showTitleIcon={true}
                TitleIcon={
                  <AccountIcon
                    fillColor={C.colors.primary.color1}
                    height={17}
                    width={14}
                  />
                }
                titleIconStyles={styles.titleIconStyles}
                eyeColor={"white"}
                selectionColor={C.colors.text.faded}
                textContentType="username"
                autoComplete="username"
              />
              <InputBox
                title={C.strings.PASSWORD}
                inputStyles={styles.textInput}
                placeholder={C.strings.ENTER_PASSWORD}
                containerStyles={styles.textInputContainer}
                ref={passwordRef}
                onChangeText={fnSetPassword}
                titleStyle={styles.textInputTitleStyle}
                placeholderTextColor={C.colors.text.color1}
                showTitleIcon={true}
                TitleIcon={
                  <LockIcon
                    fillColor={C.colors.primary.color1}
                    height={17}
                    width={14}
                  />
                }
                titleIconStyles={styles.titleIconStyles}
                eyeColor={"white"}
                selectionColor={C.colors.text.faded}
                textContentType="password"
                autoComplete="password"
                isPrivate
                blurOnSubmit
              />
              <View style={[styles.FPBtnContainer]}>
                <Pressable
                  style={[styles.btnForgotPassword]}
                  onPress={() => console.log("not available")}
                >
                  <Text style={[styles.FPText]}>
                    {C.strings.FORGOT_PASSWORD}
                  </Text>
                </Pressable>
              </View>
              <Pressable style={[styles.signInBtn]} onPress={onLogin}>
                <Text style={[styles.signInText]}>{C.strings.SIGN_IN}</Text>
              </Pressable>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={[styles.signUPtext]}>
                  {C.strings.SIGN_UP_QUESTION}
                </Text>
                <Pressable onPress={onRegister}>
                  <Text style={[styles.signUpBtnText]}>
                    {C.strings.SIGN_UP}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={[commonStyles.align.rowEvenly, styles.spacer]}>
              <View style={styles.line} />
              <Text style={styles.txtMed}>{C.strings.CONTINUE_WITH}</Text>
              <View style={styles.line} />
            </View>
            <View style={commonStyles.align.rowEvenly}>
              <Chip
                icon={<GoogleIcon />}
                text={C.strings.GOOGLE}
                onHandler={onGoogleLoginHandler}
              />
              <Chip
                icon={<AppleIcon />}
                text={C.strings.APPLE}
                onHandler={onAppleButtonPress}
              />
            </View>
            <TouchableOpacity onPress={onTermsHandler} style={[styles.terms]}>
              <Text style={styles.termsTxt}>{C.strings.ALHUB_TERMS}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default LoginPage;
