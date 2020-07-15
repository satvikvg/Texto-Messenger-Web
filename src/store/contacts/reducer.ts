import { ContactsStore } from "./types";
import { createReducer } from "typesafe-actions";
import { getContacts, searchContacts } from "./actions";
import { RootState } from "..";

const INITIAL_CONTACTS_STORE: ContactsStore = {
  isLoading: false,
  contacts: null,
  searchResults: {
    contacts: null,
    users: null,
  },
  error: null,
};

const reducer = createReducer(INITIAL_CONTACTS_STORE)
  // get contacts action reducer.
  .handleAction(getContacts.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(getContacts.success, (store, action) => ({
    ...store,
    isLoading: false,
    contacts: action.payload,
  }))

  // search contacts action reducer.
  .handleAction(searchContacts.request, (store, action) => ({
    ...store,
    isLoading: true,
  }))
  .handleAction(searchContacts.success, (store, action) => ({
    ...store,
    isLoading: false,
    searchResults: action.payload,
  }))

  // All actions Error case reducer.
  .handleAction(
    [getContacts.failure, searchContacts.failure],
    (store, action) => ({ ...store, isLoading: false, error: action.payload })
  );

// Defining all selectors for Contacts.
const isLoading = (store: RootState) => store.contacts.isLoading;
const selectContacts = (store: RootState) => store.contacts.contacts;
const getSearchResults = (store: RootState) => store.contacts.searchResults;

export const ContactsSelector = { isLoading, selectContacts, getSearchResults };

export default reducer;
