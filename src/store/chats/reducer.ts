import { ChatStore } from "./types";
import { createReducer } from "typesafe-actions";
import { getChats, searchUsers, searchChats, searchContacts } from "./actions";

const INITIAL_CHATS_STORE: ChatStore = {
  isLoading: false,
  chats: [],
  searchResults: {
    users: [],
    chats: [],
    contacts: [],
  },
  error: null,
};

const reducer = createReducer(INITIAL_CHATS_STORE)
  // Get Chats actions reducer.
  .handleAction(getChats.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(getChats.success, (store, action) => ({
    ...store,
    isLoading: false,
    chats: action.payload,
  }))

  // Search users actions reducer.
  .handleAction(searchUsers.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(searchUsers.success, (store, action) => ({
    ...store,
    isLoading: false,
    searchResults: { ...store.searchResults, users: action.payload.users },
  }))

  // Search chats actions reducer.
  .handleAction(searchChats.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(searchChats.success, (store, action) => ({
    ...store,
    isLoading: false,
    searchResults: { ...store.searchResults, chats: action.payload.chats },
  }))

  // Search Contacts actions reducer.
  .handleAction(searchContacts.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(searchContacts.success, (store, action) => ({
    ...store,
    isLoading: false,
    searchResults: {
      ...store.searchResults,
      contacts: action.payload.contacts,
    },
  }))

  // All actions Error case reducer.
  .handleAction(
    [
      getChats.failure,
      searchUsers.failure,
      searchChats.failure,
      searchContacts.failure,
    ],
    (store, action) => ({
      ...store,
      isLoading: false,
      error: action.payload,
    })
  );

export default reducer;
