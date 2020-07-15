import { all } from "redux-saga/effects";
import { authenticationWatcherSaga } from "./authentication/authenticationSaga";
import { settingsWatcherSaga } from "./settings/SettingsSaga";
import { conversationsWatcherSaga } from "./conversations/conversationsSaga";
import { contactsWatcherSaga } from "./contacts/contactsSaga";

export function* sagas() {
  yield all([
    authenticationWatcherSaga(),
    contactsWatcherSaga(),
    conversationsWatcherSaga(),
    settingsWatcherSaga(),
  ]);
}
