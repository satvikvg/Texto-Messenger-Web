import IEntity from "./Entity";
import IUser from "./User";
import IConversation from "./Conversation";

export default interface IMessage extends IEntity {
  conversation: IConversation;
  type: "TEXT" | "IMAGE" | "AUDIO" | "VIDEO";
  messageText: string | null;
  createdBy: IUser;
  createdOn: Date;
  updatedOn: Date;
  deletedOn: Date | null;
}

export function isMessage(value: any): value is IMessage {
  return (value as IMessage).conversation ? true : false;
}
