import IParticipant from "../../../../interfaces/modals/Participant";
import firebase from "firebase";
import Conversation from "./Conversation";
import UserProfile from "./UserProfile";
import {
  getReference,
  getFirestoreData,
  createMandatoryPropertyMissingException,
} from "../firestore-utils/fs-helpers";
import { Collections } from "../firestore-utils/fs-constants";

export default class Participant implements IParticipant {
  uid: string;
  conversation: Conversation;
  user: UserProfile;
  role: "ADMIN" | "MEMBER";
  createdOn: Date;
  updatedOn: Date;

  constructor(
    uid: string,
    conversation: Conversation,
    user: UserProfile,
    type: "ADMIN" | "MEMBER",
    createdOn: Date,
    updatedOn: Date
  ) {
    this.uid = uid;
    this.conversation = conversation;
    this.user = user;
    this.role = type;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }
}

function toFirestore(participant: Participant) {
  return {
    uid: participant.uid,
    conversation: getReference(
      `${Collections.Conversations}/${participant.conversation.uid}`
    ),
    user: getReference(`${Collections.Users}/${participant.user.uid}`),
    role: participant.role,
    createdOn: firebase.firestore.Timestamp.fromDate(participant.createdOn),
    updatedOn: firebase.firestore.Timestamp.fromDate(participant.updatedOn),
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
  const user = getFirestoreData<UserProfile>(data.user);

  if (!conversation || !user) {
    throw createMandatoryPropertyMissingException(
      ["conversation", "user"],
      Participant.name
    );
  }

  return new Participant(
    data.uid,
    conversation,
    user,
    data.role,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    (data.updatedOn as firebase.firestore.Timestamp).toDate()
  );
}

export const participantConverter = { toFirestore, fromFirestore };

export type ParticipantKeys = keyof Participant;
