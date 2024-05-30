import React from "react";
import { C } from "../../assets";
import { Alert, Text, View } from "react-native";
import { commonStyles } from "../../styles";
import { openUrl } from "../../utils/functions";
import { withHeader } from "../../hoc/withHeader";
import { navigator } from "../../routes/navigations";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { authSlice } from "../../redux/slices/auth.slice";
import { profileStyles as styles } from "./Profile.style";
import { PRIVACY_POLICY_LINK } from "../../utils/utilConfigs";
import SvgButton from "../../components/Buttons/SvgButton.component";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import ImageContainer from "../../components/ImageContainer/ImageContainer.component";
import ProfileNavigateCard from "../../components/ProfileNavigateCard/ProfileNavigateCard.component";
import { useMutation } from "@apollo/client";
import useAlert from "../../components/CustomAlert/CustomAlert";
// import deleteUser from "../../graphql/mutations/deleteUser";
import { showMessage } from "react-native-flash-message";
import deleteUser from "../../graphql/mutations/deleteUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeUser } from "../../redux/sagas/auth.saga";
import { userSlice } from "../../redux/slices/user.slice";
import RNRestart from "react-native-restart"; // Import package from node modules

const HeaderComponent = () => (
  <CustomHeader isBack hideShadow title={C.strings.ACCOUNT} />
);

const SectionHead = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.user);
  const onEditHandler = () => navigation.navigate("EditProfilePage");
  const onNavigateToLogin = () => {
    dispatch(
      authSlice.actions.setNavParams({
        mainParent: "HomeNavigation",
        subParent: "Profile",
      })
    );
    navigator.navigate("AuthNavigation", {
      screen: "LoginPage",
      params: {
        prev: "Profile",
      },
    });
  };
  return (
    <View style={[commonStyles.align.row, styles.topView]}>
      {user?.id ? (
        <>
          <ImageContainer name={user?.firstName} uri={user?.image?.location} />
          <View style={styles.textView}>
            <Text style={styles.profileTxt}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text
              style={styles.drkTxt}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {user?.email}
            </Text>
            <Text style={styles.drkTxt}>
              {user?.contact ? user?.contact : "Phone Number not available"}
            </Text>
            <SvgButton
              width={150}
              height={38}
              onBtnHandler={onEditHandler}
              btnStyle={styles.editBtnStyle}
              placeholder={C.strings.EDIT_PROF}
            />
          </View>
        </>
      ) : (
        <View style={styles.textView}>
          <Text style={styles.profileTxt}>Sign In For Better Experience</Text>
          <SvgButton
            height={38}
            placeholder={C.strings.LOGIN}
            btnStyle={styles.editBtnStyle}
            onBtnHandler={onNavigateToLogin}
            width={C.measures.SCREEN_WIDTH / 3}
          />
        </View>
      )}
    </View>
  );
};

const SectionBottom = () => {
  const { showAlert, AlertModal } = useAlert();
  const [onDeleteUserFn, { data, error, loading }] = useMutation(deleteUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    user,
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const id = parseInt(user?.id);
  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const signOut = () => dispatch(authSlice.actions.logOut());
  const onTermsHandler = () => openUrl(PRIVACY_POLICY_LINK);
  const onPrivacyHandler = () => openUrl(PRIVACY_POLICY_LINK);
  // console.log(user, "USER_ACCOUNT=======");

  const onDeletePress = () => {
    Alert.alert(
      //This is title
      "Account delete",
      //This is body text
      "Do you want to delete this account? You cannot undo this action.",
      [
        { text: "Ok", onPress: () => handleDeleteUser() },
        {
          text: "Cancel",
          onPress: () => {
            //console.log("No Pressed")
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
      //on clicking out side, Alert will not dismiss
    );
  };
  const onLogout = () => {
    showAlert({
      msg: "Are you sure you want to Sign out?",
      onCancel: () => console.log("Cancel Pressed"),
      onConfirm: () => signOut(),
      cancelButtonText: "No, go back",
      confirmButtonText: "Yes, proceed",
      title: "Sign out",
    });
  };
  const handleDeleteUser = async () => {
    try {
      const result = await onDeleteUserFn({
        variables: {
          uid: parseFloat(id), // Use the dynamic value here
        },
        context,
        fetchPolicy: "network-only",
      });
      // console.log("Mutation Result:", result);
      if (result.errors) {
        console.error("Mutation Errors:", result.errors);
        // Handle the errors here if needed
      }
      if (result.data) {
        signOut();
        // await removeUser();
        // dispatch(userSlice.actions.onClearUser());
        // RNRestart.restart();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <View style={styles.bottomView}>
      <ProfileNavigateCard
        disableArrow
        placeholder={C.strings.PRIVACY}
        onCardHandler={onPrivacyHandler}
      />
      <ProfileNavigateCard
        disableArrow
        placeholder={C.strings.TERMS}
        onCardHandler={onTermsHandler}
      />
      {user?.id ? (
        <>
          <ProfileNavigateCard
            disableArrow
            onCardHandler={() => onDeletePress()}
            placeholder={C.strings.DELETE_ACCOUNT}
          />
          <ProfileNavigateCard
            disableArrow
            onCardHandler={onLogout}
            placeholder={C.strings.LOG_OUT}
          />
        </>
      ) : null}
      {AlertModal}
    </View>
  );
};

const BodyComponent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.user);
  const onNavigateToOffer = (route) => navigation.navigate("MyOffersPage");
  const onNavigateToLogin = () => {
    dispatch(
      authSlice.actions.setNavParams({
        mainParent: "MyOffersPage",
      })
    );
    navigator.navigate("AuthNavigation", {
      screen: "LoginPage",
      params: {
        prev: "Profile",
      },
    });
  };
  const onOfferHandler = () => {
    if (user?.id) {
      onNavigateToOffer();
    } else onNavigateToLogin();
  };
  return (
    <View style={commonStyles.align.flex1}>
      <SectionHead />
      {user?.id ? (
        <>
          <Text style={[styles.capText, commonStyles.textStyles.capSmText]}>
            {C.strings.OFFERS}
          </Text>
          <ProfileNavigateCard
            onCardHandler={onOfferHandler}
            placeholder={C.strings.MY_OFFERS}
          />
          <Text style={[styles.capText, commonStyles.textStyles.capSmText]}>
            {C.strings.TRANSACTIONS}
          </Text>
          <ProfileNavigateCard
            placeholder={C.strings.SAVED_CARDS}
            onCardHandler={() => {}}
          />
          <ProfileNavigateCard
            placeholder={C.strings.PAYMENT_HISTORY}
            onCardHandler={() => {}}
          />
          <Text style={[styles.capText, commonStyles.textStyles.capSmText]}>
            {C.strings.BOOKINGS}
          </Text>
          <ProfileNavigateCard
            placeholder={C.strings.MY_BOOKINGS}
            onCardHandler={() => {
              navigator.navigate("HistorySelector");
            }}
          />
        </>
      ) : null}
      <SectionBottom />
    </View>
  );
};

const ProfilePage = withHeader({ HeaderComponent, BodyComponent });

export default ProfilePage;
