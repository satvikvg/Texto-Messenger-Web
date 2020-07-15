import IUser from "../modals/User";

export default interface UserService {
  /**
   * Generates new instance of User Entity with default data initialization.
   * @param uid - User ID for new User Entity.
   */
  generateNewUserProfile(uid: string): IUser;

  /**
   * Returns User document from 'Users' collection matcing the id passed.
   * @param uid - Unique identifier of user.
   */
  getUserById(uid: string): Promise<IUser | null>;

  /**
   * Saves user information into database under 'Users' collection.
   * - Created new entry if user data dosen't exist into database.
   * - Updates existing user entry if alreadz exists in databse.
   *
   * @param user - User data to be updated into database.
   */
  saveUser(user: IUser): Promise<void>;

  /**
   * Observes change in authentication state.
   * @param callBack - A function that will be called when there is any change in authentication state.
   */
  onAuthStateChanged(
    callBack: (user: IUser | null, error?: Error | null) => void
  ): void;

  /**
   * Authenticates User using phone number.
   * @param phoneNumber - Phone number of a user to be logged in, should include country code.
   * @param recaptchaVerifier - Recaptcha verifier from Google recaptcha.
   */
  signInWithPhoneNumber(
    phoneNumber: string,
    recaptchaVerifier: firebase.auth.RecaptchaVerifier
  ): Promise<string>;

  /**
   * Confirms the OTP entered by User.
   * @param verificationCode - OTP sent to User's mobile number.
   */
  confirmVerificationCode(verificationCode: string): Promise<string | null>;

  /**
   * Sign's out user.
   */
  signOut(): void;
}
