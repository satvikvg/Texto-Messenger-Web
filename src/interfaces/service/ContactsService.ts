import IUser from "../modals/User";
import IContact from "../modals/Contact";

export default interface ContactsService {
  /**
   * Fetches all the contacts of authenticated user.
   * @param currentUser - Authenticated user instance.
   */
  getContacts(currentUser: IUser): Promise<IContact[] | null>;

  /**
   * Searchs contacts using provided search keyword.
   * @param searchText - Search keyword to be searched in contacts directory for matching contacts.
   * @param currentUser - Instance of authenticated user, contacts of same user will be searched.
   */
  searchContacts(
    searchText: string,
    currentUser: IUser
  ): Promise<{ contacts: IContact[] | null; users: IUser[] | null }>;
}
