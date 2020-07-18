import { createAsyncAction, createAction } from "typesafe-actions";
import {
  GET_CONVERSATION_REQUEST,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_FAILURE,
  SEARCH_CONVERSATION_REQUEST,
  SEARCH_CONVERSATION_SUCCESS,
  SEARCH_CONVERSATION_FAILURE,
  SET_ACTIVE_CONVERSATION,
  GET_PARTICIPANTS_REQUEST,
  GET_PARTICIPANTS_FAILURE,
  GET_PARTICIPANTS_SUCCESS,
  RECEIPTS_SUBSCRIPTION_REQUEST,
  RECEIPTS_SUBSCRIPTION_UPDATE,
  RECEIPTS_SUBSCRIPTION_FAILURE,
  RECEIPTS_SUBSCRIPTION_CANCEL,
} from "./types";
import IConversation from "../../interfaces/modals/Conversation";
import IReceipt from "../../interfaces/modals/Receipt";
import IParticipant from "../../interfaces/modals/Participant";

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

export const setActiveConversation = createAction(
  SET_ACTIVE_CONVERSATION
)<IConversation | null>();

export const getParticipants = createAsyncAction(
  GET_PARTICIPANTS_REQUEST,
  GET_PARTICIPANTS_SUCCESS,
  GET_PARTICIPANTS_FAILURE
)<IConversation, IParticipant[], Error>();

export const subscribeReceipts = createAsyncAction(
  RECEIPTS_SUBSCRIPTION_REQUEST,
  RECEIPTS_SUBSCRIPTION_UPDATE,
  RECEIPTS_SUBSCRIPTION_FAILURE,
  RECEIPTS_SUBSCRIPTION_CANCEL
)<IConversation, IReceipt[] | null, Error, void>();
