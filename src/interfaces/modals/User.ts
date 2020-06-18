import IEntity from "./Entity";

export default interface IUser extends IEntity {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  userName: string;
  bio: string | null;
  isOnline: boolean;
  lastSeen: Date | null;
  createdOn: Date;
  updatedOn: Date;
}

export function isUser(value: any): value is IUser {
  return (value as IUser).userName ? true : false;
}
