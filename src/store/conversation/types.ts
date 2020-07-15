import { DeepReadonly } from "utility-types";
import IConversation from "../../interfaces/modals/Conversation";
import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

/**
 * Describing the shape of the Conversation's slice of store.
 */
export type ConversationStore = DeepReadonly<{
  isLoading: boolean;
  activeConversation: IConversation | null;
  conversations: IConversation[] | null;
  searchConversationsResults: IConversation[] | null;
  error: Error | null;
}>;

// Describing the different ACTION NAMES available.
export const GET_CONVERSATION_REQUEST =
  "com.textomessenger.store.conversation.action.GET_CONVERSATIONS_REQUEST";
export const GET_CONVERSATION_SUCCESS =
  "com.textomessenger.store.conversation.action.GET_CONVERSATIONS_SUCCESS";
export const GET_CONVERSATION_FAILURE =
  "com.textomessenger.store.conversation.action.GET_CONVERSATIONS_FAILURE";

export const SEARCH_CONVERSATION_REQUEST =
  "com.textomessenger.store.conversation.action.SEARCH_CONVERSATIONS_REQUEST";
export const SEARCH_CONVERSATION_SUCCESS =
  "com.textomessenger.store.conversation.action.SEARCH_CONVERSATIONS_SUCCESS";
export const SEARCH_CONVERSATION_FAILURE =
  "com.textomessenger.store.conversation.action.SEARCH_CONVERSATIONS_FAILURE";

export const SET_ACTIVE_CONVERSATION =
  "com.textomessenger.store.conversation.action.SET_ACTIVE_CONVERSATION";

// Describing different ACTIONS available.
export type ChatsAction = ActionType<typeof actions>;
