import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import Service from "../Service";
import UserService from "../../../interfaces/service/UserService";
import UserFbService from "./firebase-services/UserFbService";
import ContactsFbService from "./firebase-services/ContactsFbService";
import ContactsService from "../../../interfaces/service/ContactsService";
import ConversationsFbService from "./firebase-services/ConversationsFbService";
import ConversationsService from "../../../interfaces/service/ConversationsService";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export default class FirebaseService implements Service {
  defaultApp: firebase.app.App;
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;

  userFbService: UserFbService;
  contactsFbService: ContactsFbService;
  conversationsFbService: ConversationsFbService;

  constructor() {
    this.defaultApp = firebase.initializeApp(firebaseConfig);
    this.auth = this.defaultApp.auth();
    this.firestore = this.defaultApp.firestore();

    if (process.env.NODE_ENV === "development") {
      console.debug(
        "Development Environment: Disabeling firebase app verification"
      );
      // Turn off phone auth app verification.
      this.auth.settings.appVerificationDisabledForTesting = true;
    }

    this.userFbService = new UserFbService(this.auth, this.firestore);
    this.contactsFbService = new ContactsFbService(this.firestore);
    this.conversationsFbService = new ConversationsFbService(this.firestore);
  }

  public userService(): UserService {
    return this.userFbService;
  }

  public contactsService(): ContactsService {
    return this.contactsFbService;
  }

  public conversationsService(): ConversationsService {
    return this.conversationsFbService;
  }
}
