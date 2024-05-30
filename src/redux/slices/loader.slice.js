import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
};

const show = (state) => (state.loader = true);

const hide = (state) => (state.loader = false);

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    show,
    hide,
  },
});

export { loaderSlice };
