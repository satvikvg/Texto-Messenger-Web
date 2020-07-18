import IConversation from "../modals/Conversation";
import IParticipant from "../modals/Participant";
import IUser from "../modals/User";
import IReceipt from "../modals/Receipt";

export default interface ConversationsService {
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

  saveConversation(
    conversation: IConversation,
    participants?: IParticipant[]
  ): Promise<{ conversation: IConversation; participants: IParticipant[] }>;

  getReceipts(conversation: IConversation): Promise<IReceipt[] | undefined>;

  subscribeReceipts(
    conversation: IConversation,
    callback: (data: { receipts: IReceipt[] | null }) => void
  ): () => void;

  getParticipants(conversation: IConversation): Promise<IParticipant[]>;
}
