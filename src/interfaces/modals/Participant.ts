import IEntity from "./Entity";
import IConversation from "./Conversation";
import IUser from "./User";

export default interface IParticipant extends IEntity {
  conversation: IConversation;
  user: IUser;
  role: "ADMIN" | "MEMBER";
  createdOn: Date;
  updatedOn: Date;
}

export function isParticipant(value: any): value is IParticipant {
  return (value as IParticipant).role === "ADMIN" ||
    (value as IParticipant).role === "MEMBER"
    ? true
    : false;
}
