import logger from 'redux-logger';
import {rootSaga} from './root.saga';
import {rootReducer} from './root.reducer';
import createSagaMiddleware from 'redux-saga';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

const sagaMiddleWare = createSagaMiddleware();

const middleware = [sagaMiddleWare, ...getDefaultMiddleware({
  serializableCheck: false
})];

if (__DEV__) {
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export {store};

sagaMiddleWare.run(rootSaga);
