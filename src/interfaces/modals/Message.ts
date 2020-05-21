import Entity from "./Entity";
import User from "./User";

export default interface Message extends Entity {
  createdOn: Date;
  delivered: Date | null;
  from: User;
  isRead: boolean;
  messageText: string | null;
  fileURL: string | null;
  sent: Date;
  type: "TEXT" | "IMAGE" | "AUDIO" | "VIDEO";
}
