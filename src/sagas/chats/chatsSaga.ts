import { takeLatest, put, call } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import {
  getChats,
  searchUsers,
  searchChats,
  searchContacts,
} from "../../store/chats/actions";
import Chat from "../../interfaces/modals/Chat";
import User from "../../interfaces/modals/User";
import Contact from "../../interfaces/modals/Contact";
import ServiceProviderFactory from "../../services/ServiceProvicerFactory";

const service = ServiceProviderFactory.getInstance();

export function* chatsWatcherSaga() {
  // Get chats action watcher.
  yield takeLatest(getType(getChats.request), getChatsWorker);

  // Search users action worker.
  yield takeLatest(getType(searchUsers.request), searchUsersWorker);

  // Search Chats action worker.
  yield takeLatest(getType(searchChats.request), searchChatsWorker);

  // Search Contacts action worker.
  yield takeLatest(getType(searchContacts.request), searchContactsWorker);
}

function* getChatsWorker() {
  try {
    const chats: Chat[] = yield call(() => {});
    yield put(getChats.success(chats));
  } catch (error) {
    console.error(error);
    yield put(getChats.failure(error));
  }
}

function* searchUsersWorker(action: ReturnType<typeof searchUsers.request>) {
  try {
    // TODO: First search in Contacts, If not found then only search in Global users directory.
    const users: User[] = yield call(() =>
      service.userService().searchUsers(action.payload)
    );
    yield put(searchUsers.success({ users }));
  } catch (error) {
    console.error(error);
    yield put(searchUsers.failure(error));
  }
}

function* searchChatsWorker(action: ReturnType<typeof searchChats.request>) {
  try {
    const chats: Chat[] = yield call(() => {});
    yield put(searchChats.success({ chats }));
  } catch (error) {
    console.error(error);
    yield put(searchChats.failure(error));
  }
}

function* searchContactsWorker(
  action: ReturnType<typeof searchContacts.request>
) {
  try {
    const contacts: Contact[] = yield call(() => {});
    yield put(searchContacts.success({ contacts }));
  } catch (error) {
    console.error(error);
    yield put(searchContacts.failure(error));
  }
}
