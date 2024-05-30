import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  radeemCode: "",
};

const setRadeemCode = (state, action) => {
  state.radeemCode = action.payload.code;
};

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    setRadeemCode,
  },
});

export { offerSlice };
