import ContactsService from "../../../../interfaces/service/ContactsService";
import IContact from "../../../../interfaces/modals/Contact";
import { Collections } from "../firestore-utils/fs-constants";
import IUser from "../../../../interfaces/modals/User";
import { contactConverter, ContactKeys } from "../modals/Contact";
import { userProfileConverter, UserProfileKeys } from "../modals/UserProfile";
import { getReference } from "../firestore-utils/fs-helpers";

export default class ContactsFbService implements ContactsService {
  fireStore: firebase.firestore.Firestore;

  constructor(firestore: firebase.firestore.Firestore) {
    this.fireStore = firestore;
  }

  async getContacts(currentUser: IUser): Promise<IContact[] | null> {
    let contacts: IContact[] | null = null;
    const snapshot = await this.fireStore
      .collection(Collections.Contacts)
      .where(
        "userContact",
        "==",
        getReference(`${Collections.Users}/${currentUser.uid}`)
      )
      .withConverter(contactConverter)
      .get();

    if (!snapshot.empty) {
      contacts = snapshot.docs.map((doc) => doc.data() as IContact);
    }

    return contacts;
  }

  async searchContacts(
    searchText: string,
    currentUser: IUser
  ): Promise<{ contacts: IContact[] | null; users: IUser[] | null }> {
    const userContactKey: ContactKeys = "userContact";
    const userKey: ContactKeys = "user";
    const userNameKey: UserProfileKeys = "userName";

    // Initialise search results with empty arrays.
    let searchResults: {
      contacts: IContact[] | null;
      users: IUser[] | null;
    } = {
      contacts: null,
      users: null,
    };

    // Check if search key repreasents username, Username starts with @.
    if (searchText.substring(0, 1) === "@") {
      // Find searched username in Current User contacts list first.
      const contactSearchSnapshot = await this.fireStore
        .collection(Collections.Contacts)
        .where(
          userKey,
          "==",
          getReference(`${Collections.Users}/${currentUser.uid}`)
        )
        .where(userContactKey, ">=", searchText.substr(1))
        .where(userContactKey, "<=", searchText.substr(1) + "\uf8ff")
        .withConverter(contactConverter)
        .get();

      // If searched username is found in Current User contacts list then add the result to response.
      if (!contactSearchSnapshot.empty) {
        searchResults.contacts = contactSearchSnapshot.docs.map(
          (doc) => doc.data() as IContact
        );
      }

      // Also search given username in global directory to check if any other user with similar username is available.
      const userSearchSnapshot = await this.fireStore
        .collection(Collections.Users)
        .where(userNameKey, ">=", searchText.substr(1))
        .where(userNameKey, "<=", searchText.substr(1) + "\uf8ff")
        .withConverter(userProfileConverter)
        .get();

      // If searched username is found in global directory then add the result to response.
      if (!userSearchSnapshot.empty) {
        searchResults.users = userSearchSnapshot.docs.map(
          (doc) => doc.data() as IUser
        );
      }
    }

    return searchResults;
  }
}
