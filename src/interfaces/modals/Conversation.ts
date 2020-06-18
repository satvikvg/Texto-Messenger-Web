import IUser from "./User";
import IEntity from "./Entity";

export default interface IConversation extends IEntity {
  avatarURL: string | null;
  name: string | null;
  type: "INDIVISUAL" | "GROUP" | "BROADCAST";
  muteTill: Date | null;
  createdBy: IUser;
  createdOn: Date;
  updatedOn: Date;
}

export function isConversation(value: any): value is IConversation {
  return (value as IConversation).type ? true : false;
}
