import { DeepReadonly } from "utility-types";
import Chat from "../../interfaces/modals/Chat";
import Contact from "../../interfaces/modals/Contact";
import User from "../../interfaces/modals/User";
import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

// Describing the shape of the Chat's slice of store.
export type ChatStore = DeepReadonly<{
  isLoading: boolean;
  chats: Chat[];
  searchResults: {
    users: User[];
    chats: Chat[];
    contacts: Contact[];
  };
  error: Error | null;
}>;

// Describing the different ACTION NAMES available.
export const GET_CHATS_REQUEST =
  "com.textomessenger.store.chats.action.GET_CHATS_REQUEST";
export const GET_CHATS_SUCCESS =
  "com.textomessenger.store.chats.action.GET_CHATS_SUCCESS";
export const GET_CHATS_FAILURE =
  "com.textomessenger.store.chats.action.GET_CHATS_FAILURE";

export const SEARCH_USERS_REQUEST =
  "com.textomessenger.store.chats.action.SEARCH_USERS_REQUEST";
export const SEARCH_USERS_SUCCESS =
  "com.textomessenger.store.chats.action.SEARCH_USERS_SUCCESS";
export const SEARCH_USERS_FAILURE =
  "com.textomessenger.store.chats.action.SEARCH_USERS_FAILURE";

export const SEARCH_CHATS_REQUEST =
  "com.textomessenger.store.chats.action.SEARCH_CHATS_REQUEST";
export const SEARCH_CHATS_SUCCESS =
  "com.textomessenger.store.chats.action.SEARCH_CHATS_SUCCESS";
export const SEARCH_CHATS_FAILURE =
  "com.textomessenger.store.chats.action.SEARCH_CHATS_FAILURE";

export const SEARCH_CONTACTS_REQUEST =
  "com.textomessenger.store.chats.action.SEARCH_CONTACTS_REQUEST";
export const SEARCH_CONTACTS_SUCCESS =
  "com.textomessenger.store.chats.action.SEARCH_CONTACTS_SUCCESS";
export const SEARCH_CONTACTS_FAILURE =
  "com.textomessenger.store.chats.action.SEARCH_CONTACTS_FAILURE";

// Describing different ACTIONS available.
export type ChatsAction = ActionType<typeof actions>;
