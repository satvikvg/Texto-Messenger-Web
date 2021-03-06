import IReceipt from "../../../../interfaces/modals/Receipt";
import firebase from "firebase";
import Message from "./Message";
import Conversation from "./Conversation";
import UserProfile from "./UserProfile";

export default class Receipt implements IReceipt {
  uid: string;
  message: Message;
  conversation: Conversation;
  recepiant: UserProfile;
  readOn: Date | null;
  deliveredOn: Date | null;
  createdOn: Date;
  updatedOn: Date;

  constructor(
    uid: string,
    message: Message,
    conversation: Conversation,
    recepiant: UserProfile,
    readOn: Date | null,
    deliveredOn: Date | null,
    createdOn: Date,
    updatedOn: Date
  ) {
    this.uid = uid;
    this.message = message;
    this.conversation = conversation;
    this.recepiant = recepiant;
    this.readOn = readOn;
    this.deliveredOn = deliveredOn;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }
}

function toFirestore(receipt: Receipt) {
  return {
    uid: receipt.uid,
    message: receipt.message,
    conversation: receipt.conversation,
    recepiant: receipt.recepiant,
    readOn: receipt.readOn
      ? firebase.firestore.Timestamp.fromDate(receipt.readOn)
      : null,
    deliveredOn: receipt.deliveredOn
      ? firebase.firestore.Timestamp.fromDate(receipt.deliveredOn)
      : null,
    createdOn: firebase.firestore.Timestamp.fromDate(receipt.createdOn),
    updatedOn: firebase.firestore.Timestamp.fromDate(receipt.updatedOn),
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

  return new Receipt(
    data.uid,
    data.message,
    data.conversation,
    data.recepiant,
    data.readOn ? (data.readOn as firebase.firestore.Timestamp).toDate() : null,
    data.deliveredOn
      ? (data.deliveredOn as firebase.firestore.Timestamp).toDate()
      : null,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    (data.updatedOn as firebase.firestore.Timestamp).toDate()
  );
}

export const receiptConverter = { toFirestore, fromFirestore };
