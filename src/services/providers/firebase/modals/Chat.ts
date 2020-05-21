import Entity from "./Entity";
import UserProfile from "./UserProfile";
import firebase from "firebase";

export default class Chat extends Entity {
  chatName: string | null;
  chatType: "INDIVISUAL" | "GROUP" | "BROADCAST";
  createdBy: UserProfile;
  createdOn: Date;
  isMute: boolean;
  isUnRead: boolean;
  muteTill: Date | null;
  otherUser: UserProfile | null;
  updatedOn: Date;

  constructor(
    uid: string,
    chatName: string | null = null,
    chatType: "INDIVISUAL" | "GROUP" | "BROADCAST" = "INDIVISUAL",
    createdBy: UserProfile,
    createdOn: Date,
    isMute: boolean = false,
    isUnRead: boolean = false,
    muteTill: Date | null = null,
    otherUser: UserProfile | null = null,
    updatedOn: Date
  ) {
    super(uid);
    this.chatName = chatName;
    this.chatType = chatType;
    this.createdBy = createdBy;
    this.createdOn = createdOn;
    this.isMute = isMute;
    this.isUnRead = isUnRead;
    this.muteTill = muteTill;
    this.otherUser = otherUser;
    this.updatedOn = updatedOn;
  }
}

function toFirestore(chat: Chat) {
  return {
    uid: chat.uid,
    chatName: chat.chatName,
    chatType: chat.chatType,
    createdBy: chat.createdBy,
    createdOn: firebase.firestore.Timestamp.fromDate(chat.createdOn),
    isMute: chat.isMute,
    isUnRead: chat.isUnRead,
    muteTill: chat.muteTill
      ? firebase.firestore.Timestamp.fromDate(chat.muteTill)
      : null,
    otherUser: chat.otherUser,
    updatedOn: firebase.firestore.Timestamp.fromDate(chat.updatedOn),
  };
}

function fromFireStore(
  snapshot: firebase.firestore.DocumentSnapshot,
  options: firebase.firestore.SnapshotOptions
) {
  const data = snapshot.data();
  if (!data) {
    return null;
  }

  return new Chat(
    data.uid,
    data.chatName,
    data.chatType,
    data.createdBy,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    data.isMute,
    data.isUnRead,
    data.muteTill
      ? (data.muteTill as firebase.firestore.Timestamp).toDate()
      : null,
    data.otherUser,
    (data.updatedOn as firebase.firestore.Timestamp).toDate()
  );
}

export const chatConverter = { toFirestore, fromFireStore };
