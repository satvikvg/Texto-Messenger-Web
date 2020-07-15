import { takeLatest, put, call, select } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import {
  getConversations,
  searchConversations,
} from "../../store/conversation/actions";
import IConversation from "../../interfaces/modals/Conversation";
import ServiceProviderFactory from "../../services/ServiceProvicerFactory";
import { AuthenticationSelector } from "../../store/authentication/reducer";
import IUser from "../../interfaces/modals/User";

const service = ServiceProviderFactory.getInstance();

export function* conversationsWatcherSaga() {
  // Get conversations action watcher.
  yield takeLatest(getType(getConversations.request), getConversationsWorker);

  // Search conversations action worker.
  yield takeLatest(
    getType(searchConversations.request),
    searchConversationsWorker
  );
}

function* getConversationsWorker(
  action: ReturnType<typeof getConversations.request>
) {
  try {
    const currentUser: IUser | null = yield select(
      AuthenticationSelector.getCurrentUser
    );

    if (currentUser) {
      const conversations: IConversation[] | null = yield call(() =>
        service.conversationsService().getConversations(currentUser)
      );
      yield put(getConversations.success(conversations));
    } else {
      yield put(
        getConversations.failure(
          new Error("Conversation Saga: User is not authenticated")
        )
      );
    }
  } catch (error) {
    console.error(error);
    yield put(getConversations.failure(error));
  }
}

function* searchConversationsWorker(
  action: ReturnType<typeof searchConversations.request>
) {
  try {
    const currentUser: IUser | null = yield select(
      AuthenticationSelector.getCurrentUser
    );

    if (currentUser) {
      const conversations: IConversation[] | null = yield call(() =>
        service
          .conversationsService()
          .searchConversations(action.payload, currentUser)
      );
      yield put(searchConversations.success(conversations));
    } else {
      yield put(
        searchConversations.failure(
          new Error("Conversation Saga: User is not authenticated")
        )
      );
    }
  } catch (error) {
    console.error(error);
    yield put(searchConversations.failure(error));
  }
}
