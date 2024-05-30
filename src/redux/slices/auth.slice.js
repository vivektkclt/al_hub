import { createSlice } from "@reduxjs/toolkit";

// navigationParams expected type (for log-in redirection)
// navigationParams: {
//    mainParent: string;
//    subParent: string;
//    child: string;
//    params: unknown;
// }

const initialState = {
  authLoader: false,
  navigationParams: Object(null),
};

const login = (state, action) => {};
const loginWithCredentials = (state, action) => {};
const logOut = (state, action) => {
  state.navigationParams = Object(null);
};
const refresh = (state, action) => {};
const guestLogin = (state, action) => {};
const applelogin = (state, action) => {};
const setLoginLoader = (state, action) => {
  state.authLoader = !state.authLoader;
};
const setNavParams = (state, action) => {
  state.navigationParams = action.payload;
};

const updateProfile = (state, action) => {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login,
    logOut,
    refresh,
    guestLogin,
    applelogin,
    setNavParams,
    updateProfile,
    setLoginLoader,
    loginWithCredentials,
  },
});

export { authSlice };
