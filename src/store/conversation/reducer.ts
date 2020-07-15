import { ConversationStore } from "./types";
import { createReducer } from "typesafe-actions";
import {
  getConversations,
  searchConversations,
  setActiveConversation,
} from "./actions";
import { RootState } from "..";

const INITIAL_CONVERSATION_STORE: ConversationStore = {
  isLoading: false,
  activeConversation: null,
  conversations: null,
  searchConversationsResults: null,
  error: null,
};

const reducer = createReducer(INITIAL_CONVERSATION_STORE)
  // Set activeConversation action reducer.
  .handleAction(setActiveConversation, (store, action) => ({
    ...store,
    activeConversation: action.payload,
  }))

  // Get Conversations actions reducer.
  .handleAction(getConversations.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(getConversations.success, (store, action) => ({
    ...store,
    isLoading: false,
    conversations: action.payload,
  }))

  // Search Conversations actions reducer.
  .handleAction(searchConversations.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(searchConversations.success, (store, action) => ({
    ...store,
    isLoading: false,
    searchConversationsResults: action.payload,
  }))

  // All actions Error case reducer.
  .handleAction(
    [getConversations.failure, searchConversations.failure],
    (store, action) => ({
      ...store,
      isLoading: false,
      error: action.payload,
    })
  );

// Defining all selectors for Conversation Store.
const isLoading = (store: RootState) => store.conversations.isLoading;
const getActiveConversation = (store: RootState) =>
  store.conversations.activeConversation;
const selectConversations = (store: RootState) =>
  store.conversations.conversations;
const getSearchCoversationsResults = (store: RootState) =>
  store.conversations.searchConversationsResults;
const getError = (store: RootState) => store.conversations.error;

export const ConversationSelector = {
  isLoading,
  getActiveConversation,
  selectConversations,
  getSearchCoversationsResults,
  getError,
};

export default reducer;
