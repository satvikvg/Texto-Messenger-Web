import IEntity from "./Entity";
import IConversation from "./Conversation";
import IUser from "./User";

export default interface IParticipant extends IEntity {
  conversation: IConversation;
  user: IUser;
  type: "ADMIN" | "MEMBER";
  createdOn: Date;
  updatedOn: Date;
}

export function isParticipant(value: any): value is IParticipant {
  return (value as IParticipant).type === "ADMIN" ||
    (value as IParticipant).type === "MEMBER"
    ? true
    : false;
}
