import IEntity from "./Entity";
import IUser from "./User";

export default interface IContact extends IEntity {
  userContact: IUser;
  user: IUser;
  blockedSince: Date | null;
  createdOn: Date;
  updatedOn: Date;
}

export function isContact(value: any): value is IContact {
  return (value as IContact).user ? true : false;
}
