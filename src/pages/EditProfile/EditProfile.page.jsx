import { C } from "../../assets";
import { commonStyles } from "../../styles";
import { withHeader } from "../../hoc/withHeader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuthHandler from "../../hooks/useAuthHandler";
import { authSlice } from "../../redux/slices/auth.slice";
import useMediaHandler from "../../hooks/useMediaHandler";
import { detectKeyboardActive } from "../../utils/functions";
import { editProfStyles as styles } from "./EditProfile.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SvgButton from "../../components/Buttons/SvgButton.component";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import ImageContainer from "../../components/ImageContainer/ImageContainer.component";
import AnimatedTextInput from "../../components/TextInput/AnimatedTextInput.component";
import {
  Text,
  View,
  Keyboard,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import MobileOTPVerificationComponent from "../../components/Modals/MobileOTPVerification.Component";

const HeaderComponent = () => (
  <CustomHeader isBack hideShadow title={C.strings.EDIT_PROF} />
);

const BodyComponent = () => {
  const dispatch = useDispatch();
  const { storeUser } = useAuthHandler();
  const { bottom } = useSafeAreaInsets();
  const isKeyBoardActive = detectKeyboardActive();
  const { chooseFile } = useMediaHandler({ isChooseSingle: true });
  const { user } = useSelector((state) => state.user);
  const { media } = useSelector((state) => state.media);
  const [email, setEmail] = useState(user?.email ? user?.email : "");
  const [contact, setContact] = useState(user?.contact ? user?.contact : "");
  const [visible, setVisible] = useState(false);

  const [name, setName] = useState(
    user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : user?.firstName
      ? `${user?.firstName}`
      : ""
  );

  const onChangeName = (text) => setName(text);
  const onChangeEmail = (text) => setEmail(text);
  const onChangePhone = (text) => setContact(text);

  useEffect(() => {
    if (media?.length > 0) {
      const body = { ...user };
      dispatch(
        authSlice.actions.updateProfile({
          body,
          media,
          isMedia: true,
        })
      );
    }
  }, [media]);

  const onUpdateHandler = () => {
    let tmpArray = name.split(" "); //split the name to an array

    const lastName = tmpArray.pop(); // pop the last element of the aray and store it in "lastname" variable
    const firstName = tmpArray.join(" "); // join the array to make first and middlename and store it in "firstname" variale

    const body = {
      ...user,
      email,
      contact,
      lastName,
      firstName,
    };
    storeUser(body);
    dispatch(
      authSlice.actions.updateProfile({
        body,
        media,
      })
    );
  };

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        children={
          <MobileOTPVerificationComponent
            onVerified={(data) => {
              onChangePhone(data);
              hideModal();
            }}
            onClose={hideModal}
          />
        }
        visible={visible}
        onRequestClose={hideModal}
        collapsable
        transparent
        statusBarTranslucent
        animationType="slide"
      />
      <KeyboardAvoidingView
        style={commonStyles.align.flex1}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable onPress={Keyboard.dismiss} style={commonStyles.align.flex1}>
          <View style={styles.view1}>
            <ImageContainer
              showCamera
              name={user?.firstName}
              onImgHandler={chooseFile}
              uri={media[0]?.uri ?? user?.image?.location}
            />
          </View>
          <View style={styles.view2}>
            <Text style={[styles.txtSpacer, commonStyles.textStyles.capSmText]}>
              {C.strings.DETAILS}
            </Text>
            <View style={styles.paddView}>
              <AnimatedTextInput
                value={name}
                keyboardType={"default"}
                onChangeText={onChangeName}
                styleObj={styles.inputStyle}
                placeholder={C.strings.NAME_}
              />
              <AnimatedTextInput
                value={email}
                isEditable={false}
                styleObj={styles.inputStyle}
                onChangeText={onChangeEmail}
                placeholder={C.strings.EMAIL_}
                keyboardType={"email-address"}
              />
              <Pressable onPress={showModal}>
                <Pressable pointerEvents="none">
                  <AnimatedTextInput
                    value={contact}
                    keyboardType={"phone-pad"}
                    onChangeText={onChangePhone}
                    styleObj={styles.inputStyle}
                    placeholder={C.strings.PHONE_}
                  />
                </Pressable>
              </Pressable>
              {!isKeyBoardActive && (
                <SvgButton
                  showBg
                  height={45}
                  width={"100%"}
                  placeholder={C.strings.UPDATE}
                  onBtnHandler={onUpdateHandler}
                  btnStyle={[
                    styles.bottomBtn,
                    { bottom: Platform.OS === "ios" ? bottom : bottom + 15 },
                  ]}
                />
              )}
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </>
  );
};

const EditProfilePage = withHeader({ HeaderComponent, BodyComponent });

export default EditProfilePage;
