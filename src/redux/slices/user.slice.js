import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationName: "",
  clearSearch: false,
  user: Object(null),
  token: Object(null),
  location: undefined,
  googlPhotoReference: {
    loading: false,
    reference: "",
  },
};

const setToken = (state, action) => {
  state.token = action.payload.token;
};

const setLocation = (state, action) => {
  state.location = action.payload;
};

const setLocationName = (state, action) => {
  state.locationName = action.payload;
};

const setUser = (state, action) => {
  state.user = action.payload;
};

const getHomePicture = (state, action) => {
  state.googlPhotoReference.loading = true;
};

const setHomePicture = (state, action) => {
  state.googlPhotoReference.loading = false;
  state.googlPhotoReference.reference = action.payload.reference;
};

const onClearSearch = (state, action) => {
  state.clearSearch = action.payload.flag;
};

const onClearUser = (state) => {
  state.locationName = "";
  state.user = Object(null);
  state.token = Object(null);
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  setUser,
    setToken,
    onClearUser,
    setLocation,
    onClearSearch,
    setHomePicture,
    getHomePicture,
    setLocationName,
  },
});

export { userSlice };
