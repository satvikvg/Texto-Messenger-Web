import IAttachment from "../../../../interfaces/modals/Attachment";
import firebase from "firebase";
import Message from "./Message";
import TextoFile from "./TextoFile";

export default class Attachment implements IAttachment {
  uid: string;
  message: Message;
  file: TextoFile;
  createdOn: Date;
  updatedOn: Date;

  constructor(
    uid: string,
    message: Message,
    file: TextoFile,
    createdOn: Date,
    updatedOn: Date
  ) {
    this.uid = uid;
    this.message = message;
    this.file = file;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }
}

function toFirestore(attachment: Attachment) {
  return {
    uid: attachment.uid,
    message: attachment.message,
    file: attachment.file,
    createdOn: firebase.firestore.Timestamp.fromDate(attachment.createdOn),
    updatedOn: firebase.firestore.Timestamp.fromDate(attachment.updatedOn),
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

  return new Attachment(
    data.uid,
    data.message,
    data.file,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    (data.updatedOn as firebase.firestore.Timestamp).toDate()
  );
}

export const attachmentConverter = { toFirestore, fromFirestore };
