import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  radeemModal: false,
};

const showRadeemModal = (state, action) => {
  state.radeemModal = true;
};

const dismissModals = (state, action) => {
  state.radeemModal = false;
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    dismissModals,
    showRadeemModal,
  },
});

export { modalSlice };
