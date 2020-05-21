import User from "./User";
import Entity from "./Entity";

export default interface Chat extends Entity {
  chatName: string | null;
  chatType: "INDIVISUAL" | "GROUP" | "BROADCAST";
  createdBy: User;
  createdOn: Date;
  isMute: boolean;
  isUnRead: boolean;
  muteTill: Date | null;
  otherUser: User | null;
  updatedOn: Date;
}
