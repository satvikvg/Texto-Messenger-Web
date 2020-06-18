import UserService from "../../../../interfaces/service/UserService";
import IUser from "../../../../interfaces/modals/User";
import { Collections } from "../firestore-constants/fs-constants";
import firebase from "firebase";
import UserProfile, { userProfileConverter } from "../modals/UserProfile";

export default class UserFbService implements UserService {
  auth: firebase.auth.Auth;
  fireStore: firebase.firestore.Firestore;
  confirmationResult?: firebase.auth.ConfirmationResult;

  constructor(
    auth: firebase.auth.Auth,
    fireStore: firebase.firestore.Firestore
  ) {
    this.auth = auth;
    this.fireStore = fireStore;
  }

  getCurrentUserId(): string | null {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      return null;
    }

    return currentUser.uid;
  }

  generateNewUserProfile(uid: string) {
    const currentUser = this.auth.currentUser;
    const user: IUser = {
      uid: uid,
      userName: "",
      displayName: null,
      email: currentUser ? currentUser.email : null,
      phoneNumber: currentUser ? currentUser.phoneNumber : null,
      photoURL: null,
      bio: null,
      emailVerified: currentUser ? currentUser.emailVerified : false,
      isOnline: false,
      lastSeen: null,
      createdOn: new Date(),
      updatedOn: new Date(),
    };

    return user;
  }

  async getUserById(uid: string): Promise<IUser | null> {
    const snapshot = await this.fireStore
      .collection(Collections.Users)
      .doc(uid)
      .withConverter(userProfileConverter)
      .get();
    if (snapshot.exists) {
      return snapshot.data() as IUser;
    } else {
      return null;
    }
  }

  async saveUser(user: IUser): Promise<void> {
    return this.fireStore
      .collection(Collections.Users)
      .doc(user.uid)
      .withConverter(userProfileConverter)
      .set(user as UserProfile);
  }

  onAuthStateChanged(
    callBack: (user: IUser | null, error?: Error | null) => void
  ) {
    this.auth.onAuthStateChanged(
      async (fbUser) => {
        if (fbUser) {
          const user = await this.getUserById(fbUser.uid);
          callBack(user);
        } else callBack(null);
      },
      (error) => {
        if (error) {
          callBack(null, new Error(error.message));
        }
      }
    );
  }

  async signInWithPhoneNumber(
    phoneNumber: string,
    recaptchaVerifier: firebase.auth.RecaptchaVerifier
  ): Promise<string> {
    await this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    this.confirmationResult = await this.auth.signInWithPhoneNumber(
      phoneNumber,
      recaptchaVerifier
    );
    return this.confirmationResult.verificationId;
  }

  async confirmVerificationCode(
    verificationCode: string
  ): Promise<string | null> {
    if (this.confirmationResult) {
      const credential = await this.confirmationResult.confirm(
        verificationCode
      );

      return credential ? (credential.user ? credential.user.uid : null) : null;
    } else {
      throw new Error(
        "Cannot find sign in request initiated, Please initialise a Sign in request first."
      );
    }
  }

  async searchUsers(searchText: string): Promise<IUser[]> {
    const querySnapshot = await this.fireStore
      .collection(Collections.Users)
      .where("userName", ">=", searchText)
      .where("userName", "<=", searchText + "\uf8ff")
      .withConverter(userProfileConverter)
      .get();

    const users: IUser[] = [];
    querySnapshot.forEach((document) => {
      users.push(document.data() as IUser);
    });

    return users;
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }
}
