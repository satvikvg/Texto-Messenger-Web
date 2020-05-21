import Entity from "./Entity";
import User from "./User";
import Chat from "./Chat";

export default interface Contact extends Entity {
  blockedSince: Date | null;
  chat: Chat | null;
  createdOn: Date;
  isBlocked: boolean;
  user: User;
}
