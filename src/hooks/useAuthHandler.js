import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../redux/slices/auth.slice";
import { userSlice } from "../redux/slices/user.slice";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appleAuth from "@invertase/react-native-apple-authentication";
import {
  statusCodes,
  GoogleSignin,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/userinfo.email"], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    "523767493676-d7kpehc2krhjgt691k2ai5oen4uudoip.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: "", // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: "", // [Android] specifies an account name on the device that should be used
  iosClientId:
    "523767493676-usk6bdtlvb8rdk9g1e2btckeqi517c8b.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

const useAuthHandler = () => {
  const dispatch = useDispatch();
  const onGoogleLoginHandler = async () => {
    dispatch(authSlice.actions.setLoginLoader());
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      const body = {
        token: accessToken,
        email: userInfo?.user?.email,
        lastName: userInfo?.user?.familyName,
        firstName: userInfo?.user?.givenName,
      };
      console.log(body, "BODYYYYY");
      dispatch(authSlice.actions.login({ body }));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        dispatch(authSlice.actions.setLoginLoader());
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        dispatch(authSlice.actions.setLoginLoader());
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        dispatch(authSlice.actions.setLoginLoader());
        // play services not available or outdated
      } else {
        dispatch(authSlice.actions.setLoginLoader());
        // some other error happened
      }
    }
  };

  const storeToken = async (token) => {
    console.log(token, "TOKENNNNNNN");
    await AsyncStorage.setItem("token", JSON.stringify(token));
    dispatch(userSlice.actions.setToken(token));
  };

  const storeUser = async (user) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    dispatch(userSlice.actions.setUser(user));
  };

  const onAppleButtonPress = async () => {
    if (Platform.OS !== "ios") {
      showMessage({
        type: "danger",
        message: "Apple login is not supported on this device",
      });
      return;
    }
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const { identityToken } = appleAuthRequestResponse;
      const body = {
        token: identityToken,
      };
      dispatch(authSlice.actions.applelogin({ body }));
    }
  };

  return { storeUser, storeToken, onGoogleLoginHandler, onAppleButtonPress };
};

export default useAuthHandler;
