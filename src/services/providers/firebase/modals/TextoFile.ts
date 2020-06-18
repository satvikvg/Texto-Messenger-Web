import ITextoFile from "../../../../interfaces/modals/TextoFile";
import firebase from "firebase";
import UserProfile from "./UserProfile";

export default class TextoFile implements ITextoFile {
  uid: string;
  fileURL: string;
  thumbURL: string | null;
  createdBy: UserProfile;
  createdOn: Date;
  updatedOn: Date;

  constructor(
    uid: string,
    fileURL: string,
    thumbURL: string | null,
    createdBy: UserProfile,
    createdOn: Date,
    updatedOn: Date
  ) {
    this.uid = uid;
    this.fileURL = fileURL;
    this.thumbURL = thumbURL;
    this.createdBy = createdBy;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }
}

function toFirestore(file: TextoFile) {
  return {
    uid: file.uid,
    fileURL: file.fileURL,
    thumbURL: file.thumbURL,
    createdBy: file.createdBy,
    createdOn: firebase.firestore.Timestamp.fromDate(file.createdOn),
    updatedOn: firebase.firestore.Timestamp.fromDate(file.updatedOn),
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

  return new TextoFile(
    data.uid,
    data.fileURL,
    data.thumbURL,
    data.createdBy,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    (data.updatedOn as firebase.firestore.Timestamp).toDate()
  );
}

export const fileConverter = { toFirestore, fromFirestore };
