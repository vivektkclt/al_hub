import { auth } from "../../service/apis/auth";
import { userSlice } from "../slices/user.slice";
import { authSlice } from "../slices/auth.slice";
import { navigator } from "../../routes/navigations";
import { StackActions } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { put, takeEvery, select } from "redux-saga/effects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const setTokenLocally = async (token) => {
  await AsyncStorage.setItem("token", JSON.stringify(token));
};

const setUserLocally = async (user) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

const navigateTo = (page, params) => {
  navigator.dispatch(StackActions.replace(page, params));
};

export const removeUser = async () => {
  try {
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  } catch (error) {}
};

const onLoginNavigation = (navParams) => {
  let params = undefined;
  if (navParams?.mainParent) {
    if (navParams?.subParent) {
      params = {
        screen: navParams?.subParent,
        params: {
          screen: navParams?.child,
          ...navParams?.params,
        },
      };
    } else {
      params = {
        ...navParams?.params,
      };
    }
    navigateTo(navParams?.mainParent, params);
  } else {
    manageNavigation();
  }
};

function* login(action) {
  try {
    const { body } = action.payload;
    const { navigationParams } = yield select((state) => state.auth);
    let response = yield auth.signIn({ body });
    if (!response?.data?.user) {
      response = yield auth.signIn({ body });
    }
    console.log(response, "RESPONCE========");
    if (response?.status === 200) {
      setUserLocally(response?.data?.user);
      const token = {
        access_token: response?.data?.access_token,
        refresh_token: response?.data?.refresh_token,
      };
      yield setTokenLocally(token);
      yield put(
        userSlice.actions.setToken({
          token,
        })
      );
      yield put(userSlice.actions.setUser(response?.data?.user));
      yield put(authSlice.actions.setLoginLoader());
      onLoginNavigation(navigationParams);
    }
  } catch (error) {
    showMessage({
      type: "danger",
      message: "Login Failed",
    });
  }
}
function* loginWithCredentials(action) {
  try {
    const { body } = action.payload;
    const { navigationParams } = yield select((state) => state.auth);
    let response = yield auth.signInWithCredentials({ body });
    if (!response?.data?.user) {
      response = yield auth.signInWithCredentials({ body });
    }
    console.log(response, "RESPONCE========");
    if (response?.status === 200) {
      setUserLocally(response?.data?.user);
      const token = {
        access_token: response?.data?.access_token,
        refresh_token: response?.data?.refresh_token,
      };
      yield setTokenLocally(token);
      yield put(
        userSlice.actions.setToken({
          token,
        })
      );
      yield put(userSlice.actions.setUser(response?.data?.user));
      yield put(authSlice.actions.setLoginLoader());
      onLoginNavigation(navigationParams);
    } else {
      yield put(authSlice.actions.setLoginLoader());
    }
  } catch (error) {
    showMessage({
      type: "danger",
      message: "Login Failed",
    });
  }
}

function* guestLogin(action) {
  try {
    const { body } = action.payload;
    const response = yield auth.guestSignIn({ body });
    if (response?.data) {
      yield setTokenLocally(response?.data);
      yield put(
        userSlice.actions.setToken({
          token: response?.data,
        })
      );
      yield put(authSlice.actions.setLoginLoader());
      manageNavigation();
    }
  } catch (error) {
    showMessage({
      type: "danger",
      message: "Login Failed",
    });
  }
}

function* applelogin(action) {
  try {
    const { body } = action.payload;
    const response = yield auth.appleSignIn({ body });
    if (response?.status === 201) {
      setUserLocally(response?.data?.user);
      const token = {
        access_token: response?.data?.access_token,
        refresh_token: response?.data?.refresh_token,
      };
      yield setTokenLocally(token);
      yield put(
        userSlice.actions.setToken({
          token,
        })
      );
      yield put(userSlice.actions.setUser(response?.data?.user));
      yield put(authSlice.actions.setLoginLoader());
      manageNavigation();
    }
  } catch (error) {
    showMessage({
      type: "danger",
      message: "Login Failed",
    });
  }
}

function* logOut() {
  try {
    yield removeUser();
    navigator.dispatch(
      StackActions.replace("AuthNavigation", {
        screen: "LoginPage",
      })
    );
    yield put(userSlice.actions.onClearUser());
  } catch (error) {
    showMessage({
      type: "danger",
      message: "Log-out Failed",
    });
  }
}

function* refreshToken() {
  try {
    const {
      token: { access_token, refresh_token },
    } = yield select((state) => state.user);

    const response = yield auth.refrshToken({
      access_token,
      refresh_token,
    });
    if (response?.status === 200) {
      const token = {
        access_token: response?.data?.access_token,
        refresh_token: response?.data?.refresh_token,
      };
      manageNavigation();
      yield put(
        userSlice.actions.setToken({
          token,
        })
      );
      yield setTokenLocally(token);
    } else {
      yield put(authSlice.actions.logOut);
    }
  } catch (error) {
    navigateTo("AuthNavigation");
  }
}

function* updateProfile(action) {
  try {
    const {
      token: { access_token: token },
    } = yield select((state) => state.user);
    const { body, media, isMedia } = action.payload;
    if (isMedia) {
      const uploadImgRes = yield auth.updateProfilePicture({ token, media });
      if (uploadImgRes?.status === 200) {
        const user = uploadImgRes?.data?.user;
        yield put(userSlice.actions.setUser(user));
        setUserLocally(user);
        showMessage({
          type: "success",
          message: "Profile picture updated suceessfully",
        });
        yield put(mediaSlice.actions.updateMedia({ media: [] }));
      }
    }
    if (!isMedia) {
      const response = yield auth.updateProfile({ token, body });
      if (response?.status === 200) {
        showMessage({
          type: "success",
          message: "Profile updated suceessfully",
        });
        navigator.goBack();
      }
    }
  } catch (error) {}
}
export const manageNavigation = async () => {
  const isFirstUse = await AsyncStorage.getItem("isFirst");
  navigateTo(!isFirstUse ? "HomeTour" : "HomeNavigation");
};
export function* authSaga() {
  yield takeEvery("auth/login", login);
  yield takeEvery("auth/loginWithCredentials", loginWithCredentials);
  yield takeEvery("auth/logOut", logOut);
  yield takeEvery("auth/refresh", refreshToken);
  yield takeEvery("auth/applelogin", applelogin);
  yield takeEvery("auth/guestLogin", guestLogin);
  yield takeEvery("auth/updateProfile", updateProfile);
}
