import { auth } from "../../service/apis/auth";
import { userSlice } from "../slices/user.slice";
import { put, select, takeEvery } from "redux-saga/effects";

function* getHomePicture() {
  try {
    const { place_id } = yield select((state) => state.user.location);
    const reference = yield auth.getHomePicture({ place_id });
    yield put(userSlice.actions.setHomePicture({ reference }));
  } catch (err) {}
}

export function* userSaga() {
  yield takeEvery("user/getHomePicture", getHomePicture);
}
