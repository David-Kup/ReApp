import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import infocardReducer from "./reducers/infocard.reducer";
import contactReducer from "./reducers/contact.reducer";
import fileFolderReducer from "./reducers/fileFolder.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  authState: authReducer,
  infoState: infocardReducer,
  contactState: contactReducer,
  fileFolderState: fileFolderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let currentState = store.getState();

store.subscribe(() => {
  currentState = store.getState();
});

export default store;
