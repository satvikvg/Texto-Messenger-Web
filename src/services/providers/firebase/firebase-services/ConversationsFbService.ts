import IConversation from "../../../../interfaces/modals/Conversation";
import IParticipant from "../../../../interfaces/modals/Participant";
import IUser from "../../../../interfaces/modals/User";
import ConversationsService from "../../../../interfaces/service/ConversationsService";
import { Collections } from "../firestore-utils/fs-constants";
import { generateUID, getReference } from "../firestore-utils/fs-helpers";
import {
  conversationConverter,
  ConversationKeys,
} from "../modals/Conversation";
import { participantConverter, ParticipantKeys } from "../modals/Participant";
import UserProfile from "../modals/UserProfile";
import IReceipt from "../../../../interfaces/modals/Receipt";
import { ReceiptKeys, receiptConverter } from "../modals/Receipt";

export default class ConversationsFbService implements ConversationsService {
  fireStore: firebase.firestore.Firestore;

  constructor(firestore: firebase.firestore.Firestore) {
    this.fireStore = firestore;
  }

  async getConversations(currentUser: IUser): Promise<IConversation[] | null> {
    let conversationsResult: IConversation[] | null = null;

    // Keys
    const participantUserKey: ParticipantKeys = "user";

    const participantsSnapshot = await this.fireStore
      .collection(Collections.Participants)
      .where(participantUserKey, "==", currentUser as UserProfile)
      .withConverter(participantConverter)
      .get();

    if (!participantsSnapshot.empty) {
      conversationsResult = participantsSnapshot.docs.map(
        (doc) => (doc.data() as IParticipant).conversation
      );
    }

    return conversationsResult;
  }

  async searchConversations(
    searchText: string,
    currentUser: IUser
  ): Promise<IConversation[] | null> {
    let conversationsResult: IConversation[] | null = null;

    // Database column keys;
    const conversationNameKey: ConversationKeys = "name";

    // TODO: Incomplete, should find only those conversations that user is participant of.
    const conversationsSnapshot = await this.fireStore
      .collection(Collections.Conversations)
      .where(conversationNameKey, ">=", searchText)
      .where(conversationNameKey, "<=", searchText + "\uf8ff")
      .withConverter(conversationConverter)
      .get();

    if (!conversationsSnapshot.empty) {
      conversationsResult = conversationsSnapshot.docs.map(
        (doc) => doc.data() as IConversation
      );
    }

    return conversationsResult;
  }

  async getReceipts(
    conversation: IConversation
  ): Promise<IReceipt[] | undefined> {
    let receipts: IReceipt[] | undefined;

    const conversationKey: ReceiptKeys = "conversation";

    const receiptsSnapshot = await this.fireStore
      .collection(Collections.Receipts)
      .where(
        conversationKey,
        "==",
        getReference(`${Collections.Conversations}/${conversation.uid}`)
      )
      .withConverter(receiptConverter)
      .get();

    if (!receiptsSnapshot.empty) {
      receipts = receiptsSnapshot.docs.map((doc) => doc.data() as IReceipt);
    }

    return receipts;
  }

  subscribeReceipts(
    conversation: IConversation,
    callback: (data: { receipts: IReceipt[] | null }) => void
  ) {
    let receipts: IReceipt[] | undefined;

    const conversationKey: ReceiptKeys = "conversation";

    const unsubscribe = this.fireStore
      .collection(Collections.Receipts)
      .where(
        conversationKey,
        "==",
        getReference(`${Collections.Conversations}/${conversation.uid}`)
      )
      .withConverter(receiptConverter)
      .onSnapshot((receiptsSnapshot) => {
        if (!receiptsSnapshot.empty) {
          receipts = receiptsSnapshot.docs.map((doc) => doc.data() as IReceipt);
          callback({ receipts });
        }
      });

    return unsubscribe;
  }

  async getParticipants(conversation: IConversation): Promise<IParticipant[]> {
    let participants: IParticipant[];

    const conversationKey: ParticipantKeys = "conversation";

    const participantsSnapshot = await this.fireStore
      .collection(Collections.Participants)
      .where(
        conversationKey,
        "==",
        getReference(`${Collections.Conversations}/${conversation.uid}`)
      )
      .withConverter(participantConverter)
      .get();

    if (!participantsSnapshot.empty) {
      participants = participantsSnapshot.docs.map(
        (doc) => doc.data() as IParticipant
      );
    } else {
      throw new Error(
        "Data Error: Provided conversation dosenot have any participants"
      );
    }

    return participants;
  }

  async saveConversation(
    conversation: IConversation,
    participants?: IParticipant[]
  ): Promise<{ conversation: IConversation; participants: IParticipant[] }> {
    let conversationData: {
      conversation: IConversation;
      participants: IParticipant[];
    };

    // Get a new write batch.
    const batch = this.fireStore.batch();

    // Generate conversation UID if required & add it to write batch.
    if (conversation.uid === "") {
      conversation.uid = generateUID(Collections.Conversations);
    }
    batch.set(
      this.fireStore
        .collection(Collections.Conversations)
        .doc(conversation.uid)
        .withConverter(conversationConverter),
      conversation
    );

    // Set this conversation into response object.
    conversationData = { conversation, participants: [] };

    // For every participant
    // - Generate new UID if required.
    // - Add participant data to write batch.
    if (participants) {
      participants.forEach((participant) => {
        if (participant.uid === "") {
          participant.uid = generateUID(Collections.Participants);
        }
        batch.set(
          this.fireStore
            .collection(Collections.Participants)
            .doc(participant.uid)
            .withConverter(participantConverter),
          participant
        );

        conversationData.participants?.push(participant);
      });
    }

    // Execute batch write.
    await batch.commit();

    return conversationData;
  }
}
