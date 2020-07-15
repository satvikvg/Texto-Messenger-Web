import { takeLatest, put, call, select } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import ServiceProviderFactory from "../../services/ServiceProvicerFactory";
import { getContacts, searchContacts } from "../../store/contacts/actions";
import IContact from "../../interfaces/modals/Contact";
import IUser from "../../interfaces/modals/User";
import { AuthenticationSelector } from "../../store/authentication/reducer";

const service = ServiceProviderFactory.getInstance();

export function* contactsWatcherSaga() {
  // Get contacts action watcher.
  yield takeLatest(getType(getContacts.request), getContactsWorker);

  // Search contacts action watcher.
  yield takeLatest(getType(searchContacts.request), searchContactsWorker);
}

function* getContactsWorker() {
  try {
    const currentUser: IUser | null = yield select(
      AuthenticationSelector.getCurrentUser
    );

    // If User is logged in and available get data from database.
    if (currentUser) {
      const contacts: IContact[] | null = yield call(() =>
        service.contactsService().getContacts(currentUser)
      );
      yield put(getContacts.success(contacts));
    } else {
      yield put(
        getContacts.failure(new Error("Cannot find currently logged in User"))
      );
    }
  } catch (error) {
    console.error(error);
    yield put(getContacts.failure(error));
  }
}

function* searchContactsWorker(
  action: ReturnType<typeof searchContacts.request>
) {
  try {
    const currentUser: IUser | null = yield select(
      AuthenticationSelector.getCurrentUser
    );

    // If User is logged in and available get data from database.
    if (currentUser) {
      const searchResults: {
        contacts: IContact[] | null;
        users: IUser[] | null;
      } = yield call(() =>
        service.contactsService().searchContacts(action.payload, currentUser)
      );
      yield put(searchContacts.success(searchResults));
    } else {
      yield put(
        searchContacts.failure(
          new Error("Cannot find currently logged in User")
        )
      );
    }
  } catch (error) {
    console.error(error);
    yield put(searchContacts.failure(error));
  }
}
