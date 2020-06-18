import { createAsyncAction, createAction } from "typesafe-actions";
import {
  GET_CHATS_REQUEST,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAILURE,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE,
  SEARCH_CHATS_REQUEST,
  SEARCH_CHATS_SUCCESS,
  SEARCH_CHATS_FAILURE,
  SEARCH_CONTACTS_REQUEST,
  SEARCH_CONTACTS_SUCCESS,
  SEARCH_CONTACTS_FAILURE,
  SET_ACTIVE_CHAT,
} from "./types";
import IConversation from "../../interfaces/modals/Conversation";
import IUser from "../../interfaces/modals/User";
import IContact from "../../interfaces/modals/Contact";

export const getChats = createAsyncAction(
  GET_CHATS_REQUEST,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAILURE
)<unknown, IConversation[], Error>();

export const searchUsers = createAsyncAction(
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE
)<string, { users: IUser[] }, Error>();

export const searchChats = createAsyncAction(
  SEARCH_CHATS_REQUEST,
  SEARCH_CHATS_SUCCESS,
  SEARCH_CHATS_FAILURE
)<string, { chats: IConversation[] }, Error>();

export const searchContacts = createAsyncAction(
  SEARCH_CONTACTS_REQUEST,
  SEARCH_CONTACTS_SUCCESS,
  SEARCH_CONTACTS_FAILURE
)<string, { contacts: IContact[] }, Error>();

export const setActiveChat = createAction(SET_ACTIVE_CHAT)<IConversation>();
