import IUser from "../modals/User";

export default interface UserService {
  /**
   * Generates new instance of User Entity with default data initialization.
   * @param uid userId for new User Entity.
   */
  generateNewUserProfile(uid: string): IUser;

  /**
   * Returns User document from 'Users' collection matcing the id passed.
   * @param uid Unique identifier of user.
   */
  getUserById(uid: string): Promise<IUser | null>;

  /**
   * Saves user information into database under 'Users' collection.
   * - Created new entry if user data dosen't exist into database.
   * - Updates existing user entry if alreadz exists in databse.
   *
   * @param user user data to be updated into database.
   */
  saveUser(user: IUser): Promise<void>;

  onAuthStateChanged(
    callBack: (user: IUser | null, error?: Error | null) => void
  ): void;

  signInWithPhoneNumber(
    phoneNumber: string,
    recaptchaVerifier: firebase.auth.RecaptchaVerifier
  ): Promise<string>;

  confirmVerificationCode(verificationCode: string): Promise<string | null>;

  searchUsers(searchText: string): Promise<IUser[]>;

  signOut(): void;
}
