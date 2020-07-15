import { createAsyncAction, createAction } from "typesafe-actions";
import {
  GET_CONVERSATION_REQUEST,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_FAILURE,
  SEARCH_CONVERSATION_REQUEST,
  SEARCH_CONVERSATION_SUCCESS,
  SEARCH_CONVERSATION_FAILURE,
  SET_ACTIVE_CONVERSATION,
} from "./types";
import IConversation from "../../interfaces/modals/Conversation";

export const getConversations = createAsyncAction(
  GET_CONVERSATION_REQUEST,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_FAILURE
)<unknown, IConversation[] | null, Error>();

export const searchConversations = createAsyncAction(
  SEARCH_CONVERSATION_REQUEST,
  SEARCH_CONVERSATION_SUCCESS,
  SEARCH_CONVERSATION_FAILURE
)<string, IConversation[] | null, Error>();

export const setActiveConversation = createAction(SET_ACTIVE_CONVERSATION)<
  IConversation
>();
