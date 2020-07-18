import UserProfile from "./UserProfile";
import firebase from "firebase";
import IContact from "../../../../interfaces/modals/Contact";
import {
  getReference,
  getFirestoreData,
  createMandatoryPropertyMissingException,
} from "../firestore-utils/fs-helpers";
import { Collections } from "../firestore-utils/fs-constants";

export default class Contact implements IContact {
  uid: string;
  userContact: UserProfile;
  user: UserProfile;
  blockedSince: Date | null;
  createdOn: Date;
  updatedOn: Date;

  constructor(
    uid: string,
    userContact: UserProfile,
    user: UserProfile,
    blockedSince: Date | null = null,
    createdOn: Date,
    updatedOn: Date
  ) {
    this.uid = uid;
    this.userContact = userContact;
    this.user = user;
    this.blockedSince = blockedSince;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }
}

function toFirestore(contact: Contact) {
  const userContactRef = getReference(
    `${Collections.Users}/${contact.userContact.uid}`
  );
  const userRef = getReference(`${Collections.Users}/${contact.user.uid}`);
  return {
    uid: contact.uid,
    userContact: userContactRef,
    user: userRef,
    blockedSince: contact.blockedSince
      ? firebase.firestore.Timestamp.fromDate(contact.blockedSince)
      : null,
    createdOn: firebase.firestore.Timestamp.fromDate(contact.createdOn),
    updatedOn: firebase.firestore.Timestamp.fromDate(contact.updatedOn),
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

  const userContact = getFirestoreData<UserProfile>(data.userContact);
  const user = getFirestoreData<UserProfile>(data.user);

  if (!userContact || !user) {
    throw createMandatoryPropertyMissingException(
      ["userContact", "user"],
      Contact.name
    );
  }

  return new Contact(
    data.uid,
    userContact,
    user,
    data.blockedSince
      ? (data.blockedSince as firebase.firestore.Timestamp).toDate()
      : null,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    (data.updatedOn as firebase.firestore.Timestamp).toDate()
  );
}

export const contactConverter = { toFirestore, fromFirestore };

export type ContactKeys = keyof Contact;
