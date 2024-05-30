import { userSlice } from "../slices/user.slice";
import { authSlice } from "../slices/auth.slice";
import { navigator } from "../../routes/navigations";
import { StackActions } from "@react-navigation/native";
import { call, all, put, delay } from "redux-saga/effects";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUser = async () => await AsyncStorage.getItem("user");
const getToken = async () => await AsyncStorage.getItem("token");
const getUserLocation = async () => await AsyncStorage.getItem("location");
const getUserLocationName = async () =>
  await AsyncStorage.getItem("locationName");

function* getUserDetails() {
  try {
    const user = yield getUser();
    const token = yield getToken();
    const location = yield getUserLocation();
    const locationName = yield getUserLocationName();
    if (user) {
      yield put(userSlice.actions.setUser(JSON.parse(user)));
    }
    yield put(userSlice.actions.setLocationName(locationName));
    yield put(userSlice.actions.setLocation(JSON.parse(location)));
    if (token) {
      yield put(userSlice.actions.setToken({ token: JSON.parse(token) }));
      yield put(authSlice.actions.refresh());
    }
    yield delay(2000);
    if (!token) {
      navigator.dispatch(StackActions.replace("AuthNavigation"));
    }
  } catch (err) {}
}

function* initialSaga() {
  try {
    yield all([call(getUserDetails)]);
  } catch (err) {}
}

export default initialSaga;
