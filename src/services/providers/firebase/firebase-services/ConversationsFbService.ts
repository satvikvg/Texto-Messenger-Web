import ConversationsService from "../../../../interfaces/service/ConversationsService";
import IConversation from "../../../../interfaces/modals/Conversation";
import IContact from "../../../../interfaces/modals/Contact";
import { Collections } from "../firestore-utils/fs-constants";
import Conversation, {
  conversationConverter,
  ConversationKeys,
} from "../modals/Conversation";
import Participant, {
  participantConverter,
  ParticipantKeys,
} from "../modals/Participant";
import IUser from "../../../../interfaces/modals/User";
import UserProfile from "../modals/UserProfile";
import IParticipant from "../../../../interfaces/modals/Participant";

export default class ConversationsFbService implements ConversationsService {
  fireStore: firebase.firestore.Firestore;

  constructor(firestore: firebase.firestore.Firestore) {
    this.fireStore = firestore;
  }

  async createConversation(contact: IContact): Promise<IConversation> {
    const currentDate = new Date();

    const conversation: Conversation = {
      uid: this.fireStore.collection(Collections.Conversations).doc().id,
      avatarURL: null,
      name: null,
      type: "INDIVISUAL",
      muteTill: null,
      createdBy: contact.userContact,
      createdOn: currentDate,
      updatedOn: currentDate,
    };

    const participants: Participant[] = [];

    // Add current user as participant into participants list.
    participants.push({
      uid: "",
      conversation: conversation,
      type: "MEMBER",
      user: contact.userContact,
      createdOn: currentDate,
      updatedOn: currentDate,
    });

    // Add other user as participant into participants list.
    participants.push({
      uid: "",
      conversation: conversation,
      type: "MEMBER",
      user: contact.user,
      createdOn: currentDate,
      updatedOn: currentDate,
    });

    // Create a batch to write all data at once on to databse.
    const batch = this.fireStore.batch();

    // Add newly created conversation into database.
    batch.set(
      this.fireStore
        .collection(Collections.Conversations)
        .doc(conversation.uid)
        .withConverter(conversationConverter),
      conversation
    );

    // Add participants into database.
    participants.forEach((participant) => {
      batch.set(
        this.fireStore
          .collection(Collections.Participants)
          .doc(participant.uid === "" ? undefined : participant.uid)
          .withConverter(participantConverter),
        participant
      );
    });

    // Execute batch write into database.
    await batch.commit();

    return conversation;
  }

  async createGroupConversation(
    conversationName: string,
    contacts: IContact[],
    currentUser: IUser
  ): Promise<IConversation> {
    const currentDate = new Date();

    const conversation: Conversation = {
      uid: this.fireStore.collection(Collections.Conversations).doc().id,
      avatarURL: null,
      name: conversationName,
      type: "GROUP",
      muteTill: null,
      createdBy: currentUser,
      createdOn: currentDate,
      updatedOn: currentDate,
    };

    const participants: Participant[] = [];

    // Add current user as ADMIN participant in participants list.
    participants.push({
      uid: "",
      conversation: conversation,
      type: "ADMIN",
      user: currentUser,
      createdOn: currentDate,
      updatedOn: currentDate,
    });

    // Create participants from contacts & add to participnts list.
    contacts.forEach((contact) =>
      participants.push({
        uid: "",
        conversation: conversation,
        type: "MEMBER",
        user: contact.user,
        createdOn: currentDate,
        updatedOn: currentDate,
      })
    );

    // Create a batch to write all data at once into database.
    const batch = this.fireStore.batch();

    // Add conversation into database.
    batch.set(
      this.fireStore
        .collection(Collections.Conversations)
        .doc(conversation.uid)
        .withConverter(conversationConverter),
      conversation
    );

    // Add all participants into database.
    participants.forEach((participant) =>
      batch.set(
        this.fireStore
          .collection(Collections.Participants)
          .doc(participant.uid === "" ? undefined : participant.uid)
          .withConverter(participantConverter),
        participant
      )
    );

    // Execute batch write into databse.
    await batch.commit();
    return conversation;
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
}
