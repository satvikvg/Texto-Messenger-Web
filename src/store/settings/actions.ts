import {
  SET_THEME,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  SAVE_USER_PROFILE_REQUEST,
  SAVE_USER_PROFILE_SUCCESS,
  SAVE_USER_PROFILE_FAILURE,
} from "./types";
import IUser from "../../interfaces/modals/User";
import { createAsyncAction, createAction } from "typesafe-actions";
import { ThemeOptions } from "@material-ui/core";

// Describing different ACTIONS available.

export const setTheme = createAction(SET_THEME)<{ theme: ThemeOptions }>();

export const fetchUserProfileAsync = createAsyncAction(
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE
)<[undefined, { uid: string }], IUser, Error>();

export const saveUserProfileAsync = createAsyncAction(
  SAVE_USER_PROFILE_REQUEST,
  SAVE_USER_PROFILE_SUCCESS,
  SAVE_USER_PROFILE_FAILURE
)<
  [undefined, { userProfile: IUser }],
  { userProfile: IUser },
  { error: Error }
>();
