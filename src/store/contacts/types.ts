import { DeepReadonly } from "utility-types";
import IContact from "../../interfaces/modals/Contact";
import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import IUser from "../../interfaces/modals/User";

/**
 * Describing the shape of the Contacts's slice of store.
 */
export type ContactsStore = DeepReadonly<{
  isLoading: boolean;
  contacts: IContact[] | null;
  searchResults: { contacts: IContact[] | null; users: IUser[] | null };
  error: Error | null;
}>;

// Describing the different ACTION NAMES available.
export const GET_CONTACTS_REQUEST =
  "com.textomessenger.store.contacts.action.GET_CONTACTS_REQUEST";
export const GET_CONTACTS_SUCCESS =
  "com.textomessenger.store.contacts.action.GET_CONTACTS_SUCCESS";
export const GET_CONTACTS_FAILURE =
  "com.textomessenger.store.contacts.action.GET_CONTACTS_FAILURE";

export const SEARCH_CONTACTS_REQUEST =
  "com.textomessenger.store.contacts.action.SEARCH_CONTACTS_REQUEST";
export const SEARCH_CONTACTS_SUCCESS =
  "com.textomessenger.store.contacts.action.SEARCH_CONTACTS_SUCCESS";
export const SEARCH_CONTACTS_FAILURE =
  "com.textomessenger.store.contacts.action.SEARCH_CONTACTS_FAILURE";

// Describing different ACTIONS available.
export type ContactsAction = ActionType<typeof actions>;
