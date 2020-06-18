import IEntity from "./Entity";
import IUser from "./User";
import IConversation from "./Conversation";
import IMessage from "./Message";

export default interface IReceipt extends IEntity {
  message: IMessage;
  conversation: IConversation;
  recepiant: IUser;
  readOn: Date | null;
  deliveredOn: Date | null;
  createdOn: Date;
  updatedOn: Date;
}

export function isReceipt(value: any): value is IReceipt {
  return (value as IReceipt).recepiant ? true : false;
}
