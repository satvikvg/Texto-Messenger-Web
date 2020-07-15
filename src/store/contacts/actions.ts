import { createAsyncAction } from "typesafe-actions";
import {
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAILURE,
  SEARCH_CONTACTS_REQUEST,
  SEARCH_CONTACTS_SUCCESS,
  SEARCH_CONTACTS_FAILURE,
} from "./types";
import IContact from "../../interfaces/modals/Contact";
import IUser from "../../interfaces/modals/User";

export const getContacts = createAsyncAction(
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAILURE
)<unknown, IContact[] | null, Error>();

export const searchContacts = createAsyncAction(
  SEARCH_CONTACTS_REQUEST,
  SEARCH_CONTACTS_SUCCESS,
  SEARCH_CONTACTS_FAILURE
)<string, { contacts: IContact[] | null; users: IUser[] | null }, Error>();
