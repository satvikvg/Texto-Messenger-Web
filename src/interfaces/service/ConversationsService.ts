import IContact from "../modals/Contact";
import IConversation from "../modals/Conversation";
import IUser from "../modals/User";

export default interface ConversationsService {
  /**
   * Creates a new conversation from the provided contact.
   * @param contact - Contact against which a conversation to be created.
   */
  createConversation(contact: IContact): Promise<IConversation>;

  /**
   * Creates a Group Conversation.
   * @param conversationName - Name of the Conversation Group.
   * @param contacts - Contacts which should be added to the Conversation Group.
   * @param currentUser - User who is creating the Group Conversation.
   */
  createGroupConversation(
    conversationName: string,
    contacts: IContact[],
    currentUser: IUser
  ): Promise<IConversation>;

  /**
   * Gets all the conversation user is participant of.
   * @param currentUser - User instance who's coversations to be fetched.
   */
  getConversations(currentUser: IUser): Promise<IConversation[] | null>;

  /**
   * Finds the Conversations.
   * @param searchText - Search key to be matched with the name of the conversation.
   * @param currentUser - Currently logged in User.
   */
  searchConversations(
    searchText: string,
    currentUser: IUser
  ): Promise<IConversation[] | null>;
}
