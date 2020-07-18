import IAttachment from "../../../../interfaces/modals/Attachment";
import firebase from "firebase";
import Message from "./Message";
import TextoFile from "./TextoFile";
import {
  getReference,
  getFirestoreData,
  createMandatoryPropertyMissingException,
} from "../firestore-utils/fs-helpers";
import { Collections } from "../firestore-utils/fs-constants";

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
    message: getReference(`${Collections.Messages}/${attachment.message.uid}`),
    file: getReference(`${Collections.TextoFiles}/${attachment.file.uid}`),
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

  const message = getFirestoreData<Message>(data.message);
  const file = getFirestoreData<TextoFile>(data.file);

  if (!message || !file) {
    throw createMandatoryPropertyMissingException(
      ["message", "file"],
      Attachment.name
    );
  }

  return new Attachment(
    data.uid,
    message,
    file,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    (data.updatedOn as firebase.firestore.Timestamp).toDate()
  );
}

export const attachmentConverter = { toFirestore, fromFirestore };
export type AttachmentKeys = keyof Attachment;
