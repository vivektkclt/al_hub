import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  BackHandler,
} from "react-native";
import React from "react";
import CustomStatusBar from "../../components/StatusBar/CustomStatusBar.component";
import { useState } from "react";
import { useRef } from "react";
import { checkValidEmail } from "../../utils/functions";
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import InputBox from "../../components/InputField/InputField.Component";
import { C } from "../../assets";
import useAlert from "../../components/CustomAlert/CustomAlert";
import { useEffect } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import Offlinepage from "../OffilnePage/Offline.page";
const AccountRegisterPage = () => {
  const { registerUser, loading } = useRegisterUser({ onCompleted, onError });
  const { showAlert, hideAlert, AlertModal } = useAlert();
  const route = useRoute();
  const contact = route?.params;
  const navigation = useNavigation();

  const [err, setErr] = useState({});
  const { isConnected } = useNetInfo();
  const firstName = useRef("");
  const lastName = useRef("");
  const userName = useRef("");
  const emailAddress = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");

  const confirmBtnRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const fnFocusLastNameRef = () => {
    lastNameRef.current.focus();
  };
  const fnFocusUserNameRef = () => {
    userNameRef.current.focus();
  };
  const fnFocusEmailRef = () => {
    emailRef.current.focus();
  };
  const fnFocusPasswordRef = () => {
    passwordRef.current.focus();
  };
  const fnFocusConfirmPasswordRef = () => {
    confirmPasswordRef.current.focus();
  };

  const fnSetFirstName = (data) => {
    firstName.current = data;
  };
  const fnSetLaseName = (data) => {
    lastName.current = data;
  };
  const fnSetUserName = (data) => {
    userName.current = data;
  };
  const fnSetEmail = (data) => {
    emailAddress.current = data;
  };
  const fnSetPassword = (data) => {
    password.current = data;
  };
  const fnSetConfirmPassword = (data) => {
    confirmPassword.current = data;
  };

  const fnRegisterUser = () => {
    if (!validateInputs()) return;
    registerUser({
      ...contact,
      email: emailAddress.current,
      firstName: firstName.current,
      lastName: lastName.current,
      userName: userName.current,
      password: password.current,
    });
  };

  function onError(err) {
    console.log(1);
    console.log(err, "error in err fn");
    if (err == "User already exists") {
      setErr((prev) => {
        return {
          ...prev,
          email:
            "Email in use. Please log in if it's yours, or try another email.",
        };
      });
    }
    if ((err = "User Mobile Number already Exists")) {
      setErr((prev) => {
        return {
          ...prev,
          phone: "Number already in use. Please sign in or choose another.",
        };
      });
    }
  }
  function onCompleted(data) {
    console.log(data, "data in completed fn");
    navigation.navigate("LoginPage");
  }
  useEffect(() => {
    const backAction = () => {
      fnShowAlert();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const fnShowAlert = () => {
    showAlert({
      title: "Confirm",
      msg: "Are you sure you want to cancel creating your account?",
      confirmButtonText: "Confirm",
      onConfirm: fnOnCancelRegistration,
      onCancel: hideAlert,
    });
  };

  const fnOnCancelRegistration = () => {
    navigation.navigate("LoginPage");
  };

  const validateInputs = () => {
    let errors = {};
    if (firstName?.current.length < 4)
      errors.firstName = "* minimum 4 letters required";
    if (!firstName?.current) errors.firstName = "* this field is required";
    if (!lastName?.current) errors.lastName = "* this field is required";
    if (userName.current.length < 4)
      errors.userName = "* minimum 4 letters required";
    if (!userName?.current) errors.userName = "* this field is required";
    if (password?.current.length < 6)
      errors.password = "* minimum 6 letters required";
    if (!password?.current) errors.password = "* this field is required";
    if (password?.current !== confirmPassword.current)
      errors.password = "* Passwords do not match";
    if (checkValidEmail(emailAddress.current))
      errors.email = "* please enter a valid email address";
    if (!emailAddress?.current) errors.email = "* this field is required";
    setErr(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <CustomStatusBar enableTop={false} barStyle={"light-content"} />
      {AlertModal}
      {!isConnected ? (
        <Offlinepage />
      ) : (
        <ScrollView keyboardShouldPersistTaps="allways">
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: C.colors.primary.color1 }}
            contentContainerStyle={{ flex: 1 }}
            // behavior="padding"
            keyboardVerticalOffset={100}
          >
            <View style={{ flex: 1, backgroundColor: C.colors.primary.color1 }}>
              <ScrollView
                keyboardShouldPersistTaps="allways"
                contentContainerStyle={{ flex: 1, alignItems: "center" }}
              >
                <View
                  style={{
                    height: 100,
                    backgroundColor: C.colors.primary.color,
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: "center",
                      paddingVertical: 10,
                      fontWeight: "bold",
                      color: C.colors.text.color1,
                    }}
                  >
                    Register
                  </Text>
                </View>
                <View
                  style={{
                    height: 80,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: C.colors.text.black,
                    }}
                  >
                    Enter Your Details
                  </Text>
                </View>
                <InputBox
                  title={"phone Number"}
                  onChangeText={fnSetFirstName}
                  onSubmitEditing={fnFocusLastNameRef}
                  ref={firstNameRef}
                  autoFocus={true}
                  returnKeyType={"next"}
                  error={err?.phone}
                  initialValue={contact?.contact}
                  editable={false}
                />
                <InputBox
                  title={"First Name"}
                  placeholder="Enter first name"
                  onChangeText={fnSetFirstName}
                  onSubmitEditing={fnFocusLastNameRef}
                  ref={firstNameRef}
                  autoFocus={true}
                  returnKeyType={"next"}
                  error={err?.firstName}
                  placeholderTextColor={C.colors.text.faded}
                  selectionColor={C.colors.text.faded}
                  textContentType="givenName"
                  autoComplete="name-given"
                />
                <InputBox
                  title={"Last Name"}
                  placeholder="Enter last name"
                  onChangeText={fnSetLaseName}
                  onSubmitEditing={fnFocusUserNameRef}
                  ref={lastNameRef}
                  returnKeyType={"next"}
                  error={err?.lastName}
                  placeholderTextColor={C.colors.text.faded}
                  selectionColor={C.colors.text.faded}
                  textContentType="familyName"
                  autoComplete="name-family"
                />
                <InputBox
                  title={"Username"}
                  placeholder="Enter Username"
                  onChangeText={fnSetUserName}
                  ref={userNameRef}
                  keyboardType={"default"}
                  onSubmitEditing={fnFocusEmailRef}
                  returnKeyType={"next"}
                  error={err?.userName}
                  placeholderTextColor={C.colors.text.faded}
                  selectionColor={C.colors.text.faded}
                  textContentType="username"
                  autoComplete="username-new"
                />
                <InputBox
                  title={"Email Address"}
                  placeholder="Enter email address"
                  onChangeText={fnSetEmail}
                  keyboardType={"email-address"}
                  ref={emailRef}
                  onSubmitEditing={fnFocusPasswordRef}
                  returnKeyType={"next"}
                  error={err?.email}
                  placeholderTextColor={C.colors.text.faded}
                  selectionColor={C.colors.text.faded}
                  textContentType="emailAddress"
                  autoComplete="email"
                />
                <InputBox
                  title={"Password"}
                  placeholder="Enter password"
                  isPrivate={true}
                  onChangeText={fnSetPassword}
                  ref={passwordRef}
                  onSubmitEditing={fnFocusConfirmPasswordRef}
                  maxLength={12}
                  returnKeyType={"next"}
                  showInfoBtn={true}
                  infobtnContent={
                    "password must be longer than or equal to 6 characters"
                  }
                  error={err?.password}
                  placeholderTextColor={C.colors.text.faded}
                  selectionColor={C.colors.text.faded}
                  textContentType="newPassword"
                  autoComplete="password-new"
                />
                <InputBox
                  title={"Confirm Password"}
                  placeholder="Confirm password"
                  isPrivate={true}
                  onChangeText={fnSetConfirmPassword}
                  ref={confirmPasswordRef}
                  maxLength={12}
                  returnKeyType={"done"}
                  blurOnSubmit={true}
                  placeholderTextColor={C.colors.text.faded}
                  selectionColor={C.colors.text.faded}
                  textContentType="newPassword"
                  autoComplete="password-new"
                />
              </ScrollView>
              <View
                style={{
                  height: 80,
                  flexGrow: 1,
                  flexDirection: "row",
                  //  alignSelf: "center",
                  justifyContent: "space-around",
                }}
              >
                <Pressable
                  onPress={fnShowAlert}
                  ref={confirmBtnRef}
                  style={{
                    alignSelf: "flex-end",
                    marginVertical: 10,
                    height: 40,
                    width: "45%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: C.colors.border.grey,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: C.colors.text.black,
                      textTransform: "capitalize",
                    }}
                  >
                    {C.strings.CANCEL}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={fnRegisterUser}
                  ref={confirmBtnRef}
                  style={{
                    alignSelf: "flex-end",
                    marginVertical: 10,
                    height: 40,
                    width: "45%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    backgroundColor: C.colors.primary.color4,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      color: C.colors.text.black,
                    }}
                  >
                    {C.strings.CONFIRM}
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </>
  );
};

export default AccountRegisterPage;
