import User from "../../interfaces/modals/User";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

// Describing the shape of the Authentications's slice of store.
export type AuthStore = Readonly<{
  isLoading: boolean;
  activeUser: User | null;
  loginPhase: "enter-phone-number" | "enter-otp" | "enter-profile-details";
  isFirstTimeLogin: boolean;
  authError: Error | null;
}>;

// Describing the different ACTION NAMES available.
export const SET_AUTH_USER =
  "com.textomessenger.store.authentication.action.SET_AUTH_USER";
export const SET_FIRST_TIME_LOGIN =
  "com.textomessenger.store.authentication.action.SET_FIRST_TIME_LOGIN";

export const SIGN_IN_WITH_PHONE_NUMBER_REQUEST =
  "com.textomessenger.store.authentication.action.SIGN_IN_WITH_PHONE_NUMBER_REQUEST";
export const SIGN_IN_WITH_PHONE_NUMBER_SUCCESS =
  "com.textomessenger.store.authentication.action.SIGN_IN_WITH_PHONE_NUMBER_SUCCESS";
export const SIGN_IN_WITH_PHONE_NUMBER_FAILURE =
  "com.textomessenger.store.authentication.action.SIGN_IN_WITH_PHONE_NUMBER_FAILURE";

export const CONFIRM_OTP_REQUEST =
  "com.textomessenger.store.authentication.action.CONFIRM_OTP_REQUEST";
export const CONFIRM_OTP_SUCCESS =
  "com.textomessenger.store.authentication.action.CONFIRM_OTP_SUCCESS";
export const CONFIRM_OTP_FAILURE =
  "com.textomessenger.store.authentication.action.CONFIRM_OTP_FAILURE";

export const SIGN_OUT_REQUEST =
  "com.textomessenger.store.authentication.action.SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCESS =
  "com.textomessenger.store.authentication.action.SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILURE =
  "com.textomessenger.store.authentication.action.SIGN_OUT_FAILURE";

// Describing different ACTIONS available.
export type AuthenticationAction = ActionType<typeof actions>;
