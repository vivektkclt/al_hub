import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  media: [],
};

const updateMedia = (state, action) => {
  state.media = action.payload.media;
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    updateMedia,
  },
});

export { mediaSlice };
