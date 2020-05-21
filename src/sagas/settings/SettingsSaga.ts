import { call, put, takeLatest } from "redux-saga/effects";
import ServiceProviderFactory from "../../services/ServiceProvicerFactory";
import User from "../../interfaces/modals/User";
import {
  fetchUserProfileAsync,
  saveUserProfileAsync,
} from "../../store/settings/actions";
import { getType } from "typesafe-actions";

const service = ServiceProviderFactory.getInstance();

export function* settingsWatcherSaga() {
  yield takeLatest(
    getType(fetchUserProfileAsync.request),
    fetchUserProfileWorker
  );

  yield takeLatest(
    getType(saveUserProfileAsync.request),
    saveUserProfileWorker
  );
}

function* fetchUserProfileWorker(
  action: ReturnType<typeof fetchUserProfileAsync.request>
) {
  try {
    const userProfile: User | null = yield call(() =>
      service.userService().getUserById(action.meta.uid)
    );

    if (userProfile) {
      yield put(fetchUserProfileAsync.success(userProfile));
    }
  } catch (error) {
    console.error(error);
    yield put(fetchUserProfileAsync.failure(error));
  }
}

function* saveUserProfileWorker(
  action: ReturnType<typeof saveUserProfileAsync.request>
) {
  try {
    yield call(() => service.userService().saveUser(action.meta.userProfile));

    yield put(
      saveUserProfileAsync.success({ userProfile: action.meta.userProfile })
    );
  } catch (error) {
    console.error(error);
    yield put(saveUserProfileAsync.failure({ error }));
  }
}
