import { blueGrey, deepOrange } from "@material-ui/core/colors";
import { createReducer } from "typesafe-actions";
import { SettingsStore } from "./types";
import {
  setTheme,
  fetchUserProfileAsync,
  saveUserProfileAsync,
} from "./actions";

const INITIAL_SETTINGS_STORE: SettingsStore = {
  isLoading: false,
  userProfile: null,
  theme: {
    palette: {
      primary: blueGrey,
      secondary: deepOrange,
      type: "light",
    },
  },
  error: null,
};

const reducer = createReducer(INITIAL_SETTINGS_STORE)
  .handleAction(setTheme, (store, action) => ({ ...store, ...action.payload }))

  // Fetch user actions reducer.
  .handleAction(fetchUserProfileAsync.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(fetchUserProfileAsync.success, (store, action) => ({
    ...store,
    isLoading: false,
    userProfile: action.payload,
  }))
  .handleAction(fetchUserProfileAsync.failure, (store, action) => ({
    ...store,
    isLoading: false,
    error: action.payload,
  }))

  // Save user actions reducer.
  .handleAction(saveUserProfileAsync.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(saveUserProfileAsync.success, (store, action) => ({
    ...store,
    isLoading: false,
    ...action.payload,
  }))
  .handleAction(saveUserProfileAsync.failure, (store, action) => ({
    ...store,
    isLoading: false,
    ...action.payload,
  }));

export default reducer;
