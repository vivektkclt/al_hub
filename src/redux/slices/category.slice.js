import { C } from "../../assets";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeTab: "",
  selectedOffer: {},
  selectedStore: {},
  selectedCategory: {},
  searchFromInsideCategory: false,
  selectedReview: C.strings.SORT_DESC1,
};

const chooseCategory = (state, action) => {
  state.selectedCategory = action.payload.item;
};

const chooseStore = (state, action) => {
  state.selectedStore = action.payload.item;
};

const setStoreTab = (state, action) => {
  state.storeTab = action.payload.tab;
};

const setSelectedReview = (state, action) => {
  state.selectedReview = action.payload;
};

const setSearchFlag = (state, action) => {
  state.searchFromInsideCategory = action.payload.flag;
};

const setSelectedOffer = (state, action) => {
  state.selectedOffer = action.payload.offer;
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    chooseStore,
    setStoreTab,
    setSearchFlag,
    chooseCategory,
    setSelectedOffer,
    setSelectedReview,
  },
});

export { categorySlice };
