import {
  SET_AUTH_USER,
  SIGN_IN_WITH_PHONE_NUMBER_REQUEST,
  SIGN_IN_WITH_PHONE_NUMBER_SUCCESS,
  SIGN_IN_WITH_PHONE_NUMBER_FAILURE,
  CONFIRM_OTP_REQUEST,
  CONFIRM_OTP_SUCCESS,
  CONFIRM_OTP_FAILURE,
  SET_FIRST_TIME_LOGIN,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  AUTH_STATE_CHANGE_SUBSCRIBE,
  AUTH_STATE_CHANGE_UNSUBSCRIBE,
} from "./types";
import IUser from "../../interfaces/modals/User";
import { createAction, createAsyncAction } from "typesafe-actions";

export const setAuthUser = createAction(SET_AUTH_USER)<IUser | null>();

export const subscribeAuthState = createAction(AUTH_STATE_CHANGE_SUBSCRIBE)<
  void
>();

export const unsubscribeAuthState = createAction(AUTH_STATE_CHANGE_UNSUBSCRIBE)<
  void
>();

export const setFirstTimeLogin = createAction(SET_FIRST_TIME_LOGIN)<boolean>();

export const signInWithPhoneNumber = createAsyncAction(
  SIGN_IN_WITH_PHONE_NUMBER_REQUEST,
  SIGN_IN_WITH_PHONE_NUMBER_SUCCESS,
  SIGN_IN_WITH_PHONE_NUMBER_FAILURE
)<
  [
    undefined,
    { phoneNumber: string; appVerifier: firebase.auth.RecaptchaVerifier }
  ],
  undefined,
  Error
>();

export const confirmOTP = createAsyncAction(
  CONFIRM_OTP_REQUEST,
  CONFIRM_OTP_SUCCESS,
  CONFIRM_OTP_FAILURE
)<[undefined, string], undefined, Error>();

export const signOut = createAsyncAction(
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE
)<undefined, undefined, Error>();
