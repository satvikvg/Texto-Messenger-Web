import { createAsyncAction } from "typesafe-actions";
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
} from "./types";
import Chat from "../../interfaces/modals/Chat";
import User from "../../interfaces/modals/User";
import Contact from "../../interfaces/modals/Contact";

export const getChats = createAsyncAction(
  GET_CHATS_REQUEST,
  GET_CHATS_SUCCESS,
  GET_CHATS_FAILURE
)<unknown, Chat[], Error>();

export const searchUsers = createAsyncAction(
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE
)<string, { users: User[] }, Error>();

export const searchChats = createAsyncAction(
  SEARCH_CHATS_REQUEST,
  SEARCH_CHATS_SUCCESS,
  SEARCH_CHATS_FAILURE
)<string, { chats: Chat[] }, Error>();

export const searchContacts = createAsyncAction(
  SEARCH_CONTACTS_REQUEST,
  SEARCH_CONTACTS_SUCCESS,
  SEARCH_CONTACTS_FAILURE
)<string, { contacts: Contact[] }, Error>();
