import { combineReducers } from "redux";
import { authSlice } from "../slices/auth.slice";
import { userSlice } from "../slices/user.slice";
import { offerSlice } from "../slices/offer.slice";
import { modalSlice } from "../slices/modal.slice";
import { mediaSlice } from "../slices/media.slice";
import { loaderSlice } from "../slices/loader.slice";
import { categorySlice } from "../slices/category.slice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  modal: modalSlice.reducer,
  media: mediaSlice.reducer,
  offer: offerSlice.reducer,
  loader: loaderSlice.reducer,
  category: categorySlice.reducer,
});
