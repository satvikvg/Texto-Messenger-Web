import { call, put, takeLatest } from "redux-saga/effects";
import ServiceProviderFactory from "../../services/ServiceProvicerFactory";
import {
  setFirstTimeLogin,
  signInWithPhoneNumber,
  confirmOTP,
  setAuthUser,
  signOut,
} from "../../store/authentication/actions";
import IUser from "../../interfaces/modals/User";
import { getType } from "typesafe-actions";

const service = ServiceProviderFactory.getInstance();

export function* authenticationWatcherSaga() {
  console.debug("Authentication Watcher Saga is running...");

  // Sign In action watcher.
  yield takeLatest(
    getType(signInWithPhoneNumber.request),
    signInWithPhoneNumberWorker
  );

  // Confirm OTP action watcher.
  yield takeLatest(getType(confirmOTP.request), confirmOTPWorker);

  // Sign Out action watcher.
  yield takeLatest(getType(signOut.request), signOutWorker);
}

function* signInWithPhoneNumberWorker(
  action: ReturnType<typeof signInWithPhoneNumber.request>
) {
  console.debug("Sign in with phone number worker trigerred!");
  try {
    const authToken = yield call(() =>
      service
        .userService()
        .signInWithPhoneNumber(action.meta.phoneNumber, action.meta.appVerifier)
    );

    console.debug("Verification Id: ", authToken);

    if (authToken) {
      yield put(signInWithPhoneNumber.success());
    }
  } catch (authError) {
    console.error(authError);
    yield put(signInWithPhoneNumber.failure(authError));
  }
}

function* confirmOTPWorker(action: ReturnType<typeof confirmOTP.request>) {
  try {
    const userId: string = yield call(() =>
      service.userService().confirmVerificationCode(action.meta)
    );

    if (!userId) {
      yield put(confirmOTP.failure(new Error("Unknown error occoured.")));
    }

    // Get logged in user details from database.
    let user: IUser = yield call(() =>
      service.userService().getUserById(userId)
    );

    if (!user) {
      // If user not found in database, then trigger first time login action.
      yield put(setFirstTimeLogin(true));

      // Generate new user profile.
      user = service.userService().generateNewUserProfile(userId);
    }
    // Dispatch set authenticated user action.
    yield put(setAuthUser(user));
    yield put(confirmOTP.success());
  } catch (authError) {
    console.error(authError);
    yield put(confirmOTP.failure(authError));
  }
}

function* signOutWorker() {
  try {
    yield call(() => service.userService().signOut());

    // Sign Out successfull, dispatch sign out success action.
    yield put(signOut.success());
  } catch (error) {
    console.error(error);
    yield put(signOut.failure(error));
  }
}
