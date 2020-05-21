import Entity from "./Entity";
import UserProfile from "./UserProfile";
import firebase from "firebase";

export default class Message extends Entity {
  createdOn: Date;
  delivered: Date | null;
  from: UserProfile;
  isRead: boolean;
  messageText: string | null;
  fileURL: string | null;
  sent: Date;
  type: "TEXT" | "IMAGE" | "AUDIO" | "VIDEO";

  constructor(
    uid: string,
    createdOn: Date,
    delivered: Date | null = null,
    from: UserProfile,
    isRead: boolean,
    messageText: string | null = null,
    fileURL: string | null = null,
    sent: Date,
    type: "TEXT" | "IMAGE" | "AUDIO" | "VIDEO" = "TEXT"
  ) {
    super(uid);

    this.createdOn = createdOn;
    this.delivered = delivered;
    this.from = from;
    this.isRead = isRead;
    this.messageText = messageText;
    this.fileURL = fileURL;
    this.sent = sent;
    this.type = type;
  }
}

function toFirestore(message: Message) {
  return {
    uid: message.uid,
    createdOn: firebase.firestore.Timestamp.fromDate(message.createdOn),
    delivered: message.delivered
      ? firebase.firestore.Timestamp.fromDate(message.delivered)
      : null,
    from: message.from,
    isRead: message.isRead,
    messageText: message.messageText,
    fileURL: message.fileURL,
    sent: firebase.firestore.Timestamp.fromDate(message.sent),
    type: message.type,
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

  return new Message(
    data.uid,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    data.delivered
      ? (data.delivered as firebase.firestore.Timestamp).toDate()
      : null,
    data.from,
    data.isRead,
    data.messageText,
    data.fileURL,
    (data.sent as firebase.firestore.Timestamp).toDate(),
    data.type
  );
}

export const messageConverter = { toFirestore, fromFirestore };
