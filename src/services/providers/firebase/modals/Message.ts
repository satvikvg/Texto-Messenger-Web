import UserProfile from "./UserProfile";
import firebase from "firebase";
import IMessage from "../../../../interfaces/modals/Message";
import Conversation from "./Conversation";
import {
  getReference,
  getFirestoreData,
  createMandatoryPropertyMissingException,
} from "../firestore-utils/fs-helpers";
import { Collections } from "../firestore-utils/fs-constants";

export default class Message implements IMessage {
  uid: string;
  conversation: Conversation;
  type: "TEXT" | "IMAGE" | "AUDIO" | "VIDEO";
  messageText: string | null;
  createdBy: UserProfile;
  createdOn: Date;
  updatedOn: Date;
  deletedOn: Date | null;

  constructor(
    uid: string,
    conversation: Conversation,
    type: "TEXT" | "IMAGE" | "AUDIO" | "VIDEO",
    messageText: string | null,
    createdBy: UserProfile,
    createdOn: Date,
    updatedOn: Date,
    deletedOn: Date | null
  ) {
    this.uid = uid;
    this.conversation = conversation;
    this.type = type;
    this.messageText = messageText;
    this.createdBy = createdBy;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
    this.deletedOn = deletedOn;
  }
}

function toFirestore(message: Message) {
  return {
    uid: message.uid,
    conversation: getReference(
      `${Collections.Conversations}/${message.conversation.uid}`
    ),
    type: message.type,
    messageText: message.messageText,
    createdBy: getReference(`${Collections.Users}/${message.createdBy.uid}`),
    createdOn: firebase.firestore.Timestamp.fromDate(message.createdOn),
    updatedOn: firebase.firestore.Timestamp.fromDate(message.updatedOn),
    deletedOn: message.deletedOn
      ? firebase.firestore.Timestamp.fromDate(message.deletedOn)
      : null,
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

  const conversation = getFirestoreData<Conversation>(data.conversation);
  const createdBy = getFirestoreData<UserProfile>(data.createdBy);

  if (!conversation || !createdBy) {
    throw createMandatoryPropertyMissingException(
      ["conversation", "createdBy"],
      Message.name
    );
  }

  return new Message(
    data.uid,
    conversation,
    data.type,
    data.messageText,
    createdBy,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    (data.updatedOn as firebase.firestore.Timestamp).toDate(),
    data.deletedOn
      ? (data.deletedOn as firebase.firestore.Timestamp).toDate()
      : null
  );
}

export const messageConverter = { toFirestore, fromFirestore };
