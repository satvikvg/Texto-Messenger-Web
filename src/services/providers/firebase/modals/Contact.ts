import Entity from "./Entity";
import Chat from "./Chat";
import UserProfile from "./UserProfile";
import firebase from "firebase";

export default class Contact extends Entity {
  blockedSince: Date | null;
  chat: Chat | null;
  createdOn: Date;
  isBlocked: boolean;
  user: UserProfile;

  constructor(
    uid: string,
    blockedSince: Date | null = null,
    chat: Chat | null = null,
    createdOn: Date,
    isBlocked: boolean = false,
    user: UserProfile
  ) {
    super(uid);

    this.blockedSince = blockedSince;
    this.chat = chat;
    this.createdOn = createdOn;
    this.isBlocked = isBlocked;
    this.user = user;
  }
}

function toFirestore(contact: Contact) {
  return {
    uid: contact.uid,
    blockedSince: contact.blockedSince
      ? firebase.firestore.Timestamp.fromDate(contact.blockedSince)
      : null,
    chat: contact.chat,
    createdOn: firebase.firestore.Timestamp.fromDate(contact.createdOn),
    isBlocked: contact.isBlocked,
    user: contact.user,
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

  return new Contact(
    data.uid,
    data.blockedSince
      ? (data.blockedSince as firebase.firestore.Timestamp).toDate()
      : null,
    data.chat,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    data.isBlocked,
    data.user
  );
}

export const contactConverter = { toFirestore, fromFirestore };
