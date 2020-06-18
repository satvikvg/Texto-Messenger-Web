import firebase from "firebase";
import IUser from "../../../../interfaces/modals/User";

export default class UserProfile implements IUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  userName: string;
  bio: string | null;
  isOnline: boolean;
  lastSeen: Date | null;
  createdOn: Date;
  updatedOn: Date;

  constructor(
    uid: string,
    displayName: string | null = null,
    email: string | null = null,
    emailVerified: boolean = false,
    phoneNumber: string | null = null,
    photoURL: string | null = null,
    userName: string,
    bio: string | null,
    isOnline: boolean = false,
    lastSeen: Date | null,
    createdOn: Date,
    updatedOn: Date
  ) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.emailVerified = emailVerified;
    this.phoneNumber = phoneNumber;
    this.photoURL = photoURL;
    this.userName = userName;
    this.bio = bio;
    this.isOnline = isOnline;
    this.lastSeen = lastSeen;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }
}

function toFirestore(userProfile: UserProfile) {
  return {
    uid: userProfile.uid,
    displayName: userProfile.displayName,
    email: userProfile.email,
    emailVerified: userProfile.emailVerified,
    phoneNumber: userProfile.phoneNumber,
    photoURL: userProfile.photoURL,
    userName: userProfile.userName,
    bio: userProfile.bio,
    isOnline: userProfile.isOnline,
    lastSeen: userProfile.lastSeen
      ? firebase.firestore.Timestamp.fromDate(userProfile.lastSeen)
      : null,
    createdOn: firebase.firestore.Timestamp.fromDate(userProfile.createdOn),
    updatedOn: firebase.firestore.Timestamp.fromDate(userProfile.updatedOn),
  };
}

function fromFirestore(
  snapshot: firebase.firestore.DocumentSnapshot,
  options: firebase.firestore.SnapshotOptions
): UserProfile | null {
  const data = snapshot.data(options);
  if (!data) {
    return null;
  }
  return new UserProfile(
    data.uid,
    data.displayName,
    data.email,
    data.emailVerified,
    data.phoneNumber,
    data.photoURL,
    data.userName,
    data.bio,
    data.isOnline,
    data.lastSeen
      ? (data.lastSeen as firebase.firestore.Timestamp).toDate()
      : null,
    (data.createdOn as firebase.firestore.Timestamp).toDate(),
    (data.updatedOn as firebase.firestore.Timestamp).toDate()
  );
}

export const userProfileConverter = { toFirestore, fromFirestore };
