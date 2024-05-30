import { all } from "redux-saga/effects";
import { userSaga } from "../sagas/user.saga";
import { authSaga } from "../sagas/auth.saga";
import initialSaga from "../sagas/initial.saga";

function* rootSaga() {
  yield all([authSaga(), initialSaga(), userSaga()]);
}

export { rootSaga };
