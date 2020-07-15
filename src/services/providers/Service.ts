import UserService from "../../interfaces/service/UserService";
import ContactsService from "../../interfaces/service/ContactsService";
import ConversationsService from "../../interfaces/service/ConversationsService";

abstract class Service {
  public abstract userService(): UserService;
  public abstract contactsService(): ContactsService;
  public abstract conversationsService(): ConversationsService;
}

export default Service;
