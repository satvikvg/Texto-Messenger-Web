import { AuthStore as AuthenticationStore } from "./types";
import { createReducer } from "typesafe-actions";
import {
  setAuthUser,
  setFirstTimeLogin,
  signInWithPhoneNumber,
  confirmOTP,
  signOut,
} from "./actions";

const INITIAL_AUTHENTICATION_STORE: AuthenticationStore = {
  isLoading: false,
  activeUser: null,
  loginPhase: "enter-phone-number",
  isFirstTimeLogin: false,
  authError: null,
};

const reducer = createReducer(INITIAL_AUTHENTICATION_STORE)
  // Set Active user reducer.
  .handleAction(setAuthUser, (store, action) => ({
    ...store,
    activeUser: action.payload,
  }))

  // Set First time login action reducer.
  .handleAction(setFirstTimeLogin, (store, action) => ({
    ...store,
    isFirstTimeLogin: action.payload,
  }))

  // Sign in with phone number action reducer.
  .handleAction(signInWithPhoneNumber.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(signInWithPhoneNumber.success, (store, action) => ({
    ...store,
    isLoading: false,
    loginPhase: "enter-otp",
  }))

  // Confirm OTP action reducer.
  .handleAction(confirmOTP.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(confirmOTP.success, (store, action) => ({
    ...store,
    isLoading: false,
    loginPhase: "enter-profile-details",
  }))

  // Sign Out action reducer.
  .handleAction(signOut.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(
    signOut.success,
    (store, action) => INITIAL_AUTHENTICATION_STORE
  )

  // All actions Error case reducer.
  .handleAction(
    [signInWithPhoneNumber.failure, confirmOTP.failure, signOut.failure],
    (store, action) => ({
      ...store,
      isLoading: false,
      authError: action.payload,
    })
  );

export default reducer;
