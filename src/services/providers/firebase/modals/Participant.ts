import IParticipant from "../../../../interfaces/modals/Participant";
import firebase from "firebase";
import Conversation from "./Conversation";
import UserProfile from "./UserProfile";

export default class Participant implements IParticipant {
  uid: string;
  conversation: Conversation;
  user: UserProfile;
  type: "ADMIN" | "MEMBER";
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
    this.type = type;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }
}

function toFirestore(participant: Participant) {
  return {
    uid: participant.uid,
    conversation: participant.conversation,
    user: participant.user,
    type: participant.type,
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

  return new Participant(
    data.uid,
    data.conversation,
    data.user,
    data.type,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    (data.updatedOn as firebase.firestore.Timestamp).toDate()
  );
}

export const participantConverter = { toFirestore, fromFirestore };

export type ParticipantKeys = keyof Participant;
