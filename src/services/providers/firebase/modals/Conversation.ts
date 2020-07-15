import UserProfile from "./UserProfile";
import firebase from "firebase";
import IConversation from "../../../../interfaces/modals/Conversation";

export default class Conversation implements IConversation {
  uid: string;
  avatarURL: string | null;
  name: string | null;
  type: "INDIVISUAL" | "GROUP" | "BROADCAST";
  muteTill: Date | null;
  createdBy: UserProfile;
  createdOn: Date;
  updatedOn: Date;

  constructor(
    uid: string,
    avatarURL: string | null,
    name: string | null = null,
    type: "INDIVISUAL" | "GROUP" | "BROADCAST" = "INDIVISUAL",
    muteTill: Date | null = null,
    createdBy: UserProfile,
    createdOn: Date,
    updatedOn: Date
  ) {
    this.uid = uid;
    this.avatarURL = avatarURL;
    this.name = name;
    this.type = type;
    this.muteTill = muteTill;
    this.createdBy = createdBy;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }
}

function toFirestore(conversation: Conversation) {
  return {
    uid: conversation.uid,
    avatarURL: conversation.avatarURL,
    name: conversation.name,
    type: conversation.type,
    muteTill: conversation.muteTill
      ? firebase.firestore.Timestamp.fromDate(conversation.muteTill)
      : null,
    createdBy: conversation.createdBy,
    createdOn: firebase.firestore.Timestamp.fromDate(conversation.createdOn),
    updatedOn: firebase.firestore.Timestamp.fromDate(conversation.updatedOn),
  };
}

function fromFirestore(
  snapshot: firebase.firestore.DocumentSnapshot,
  options: firebase.firestore.SnapshotOptions
) {
  const data = snapshot.data();
  if (!data) {
    return null;
  }

  return new Conversation(
    data.uid,
    data.avatarURL,
    data.name,
    data.type,
    data.muteTill
      ? (data.muteTill as firebase.firestore.Timestamp).toDate()
      : null,
    data.createdBy,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    (data.updatedOn as firebase.firestore.Timestamp).toDate()
  );
}

export const conversationConverter = { toFirestore, fromFirestore };

export type ConversationKeys = keyof Conversation;
