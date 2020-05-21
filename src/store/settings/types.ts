import { ThemeOptions } from "@material-ui/core";
import User from "../../interfaces/modals/User";
import * as settingsActions from "./actions";
import { ActionType } from "typesafe-actions";

// Describing the shape of Settings's slice of store.

export type SettingsStore = Readonly<{
  isLoading: boolean;
  userProfile: User | null;
  theme: ThemeOptions;
  error: Error | null;
}>;

// Describing the different ACTION NAMES available.
export const SET_THEME = "com.textomessenger.store.app.action.SET_THEME";

export const USER_PROFILE_REQUEST =
  "com.textomessenger.store.app.action.GET_USER_PROFILE_REQUEST";
export const USER_PROFILE_SUCCESS =
  "com.textomessenger.store.app.action.GET_USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAILURE =
  "com.textomessenger.store.app.action.GET_USER_PROFILE_FAILURE";

export const SAVE_USER_PROFILE_REQUEST =
  "com.textomessenger.store.app.action.SAVE_USER_PROFILE_REQUEST";
export const SAVE_USER_PROFILE_SUCCESS =
  "com.textomessenger.store.app.action.SAVE_USER_PROFILE_SUCCESS";
export const SAVE_USER_PROFILE_FAILURE =
  "com.textomessenger.store.app.action.SAVE_USER_PROFILE_FAILURE";

// Describing different ACTIONS available.
export type SettingsAction = ActionType<typeof settingsActions>;
