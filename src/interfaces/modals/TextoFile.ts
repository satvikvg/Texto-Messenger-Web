import IEntity from "./Entity";
import IUser from "./User";

export default interface ITextoFile extends IEntity {
  fileURL: string;
  thumbURL: string | null;
  createdBy: IUser;
  createdOn: Date;
  updatedOn: Date;
}

export function isFile(value: any): value is ITextoFile {
  return (value as ITextoFile).fileURL ? true : false;
}
