import IEntity from "./Entity";
import IMessage from "./Message";
import ITextoFile from "./TextoFile";

export default interface IAttachment extends IEntity {
  message: IMessage;
  file: ITextoFile;
  createdOn: Date;
  updatedOn: Date;
}

export function isAttachment(value: any): value is IAttachment {
  return (value as IAttachment).file ? true : false;
}
