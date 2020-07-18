import {
  call,
  put,
  select,
  takeLatest,
  take,
  fork,
  race,
} from "redux-saga/effects";
import { getType } from "typesafe-actions";
import IConversation from "../../interfaces/modals/Conversation";
import IReceipt from "../../interfaces/modals/Receipt";
import IUser from "../../interfaces/modals/User";
import ServiceProviderFactory from "../../services/ServiceProvicerFactory";
import { AuthenticationSelector } from "../../store/authentication/reducer";
import {
  getConversations,
  searchConversations,
  getParticipants,
  subscribeReceipts,
} from "../../store/conversation/actions";
import IParticipant from "../../interfaces/modals/Participant";
import { RECEIPTS_SUBSCRIPTION_REQUEST } from "../../store/conversation/types";
import { EventChannel, eventChannel } from "redux-saga";

const service = ServiceProviderFactory.getInstance();

export function* conversationsWatcherSaga() {
  // Get Receipts action watcher.
  const subscribeReceiptsAction: ReturnType<typeof subscribeReceipts.request> = yield take(
    getType(subscribeReceipts.request)
  );

  if (subscribeReceiptsAction.type === RECEIPTS_SUBSCRIPTION_REQUEST) {
    yield fork(receiptSubscriptionWorker, subscribeReceiptsAction);
  }

  // Get Participants acton watcher.
  yield takeLatest(getType(getParticipants.request), getParticipantsWorker);

  // Get conversations action watcher.
  yield takeLatest(getType(getConversations.request), getConversationsWorker);

  // Search conversations action watcher.
  yield takeLatest(
    getType(searchConversations.request),
    searchConversationsWorker
  );
}

function* receiptSubscriptionWorker(
  action: ReturnType<typeof subscribeReceipts.request>
) {
  try {
    let receiptSubscriptionChannel: EventChannel<{
      receipts: IReceipt[] | null;
    }> | null = null;

    while (true) {
      if (!receiptSubscriptionChannel) {
        receiptSubscriptionChannel = eventChannel<{
          receipts: IReceipt[] | null;
        }>((emitter) =>
          service
            .conversationsService()
            .subscribeReceipts(action.payload, emitter)
        );
      }

      const {
        data,
      }: {
        data: { receipts: IReceipt[] | null };
      } = yield race({
        data: take(receiptSubscriptionChannel),
        cancel: take(getType(subscribeReceipts.cancel)),
      });

      if (data) {
        yield put(subscribeReceipts.success(data.receipts));
      } else {
        receiptSubscriptionChannel.close();
      }
    }
  } catch (error) {
    console.error(error);
    yield put(subscribeReceipts.failure(error));
  }
}

function* getParticipantsWorker(
  action: ReturnType<typeof getParticipants.request>
) {
  try {
    const conversation = action.payload;
    if (conversation.uid === "") {
      return;
    }

    const participants: IParticipant[] = yield call(() =>
      service.conversationsService().getParticipants(conversation)
    );

    yield put(getParticipants.success(participants));
  } catch (error) {
    console.error(error);
    yield put(getParticipants.failure(error));
  }
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
