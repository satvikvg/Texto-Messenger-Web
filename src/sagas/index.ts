import { all } from "redux-saga/effects";
import { authenticationWatcherSaga } from "./authentication/authenticationSaga";
import { settingsWatcherSaga } from "./settings/SettingsSaga";

export function* sagas() {
  yield all([authenticationWatcherSaga(), settingsWatcherSaga()]);
}
