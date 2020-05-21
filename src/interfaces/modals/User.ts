import Entity from "./Entity";

export default interface User extends Entity {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;

  photoURL: string | null;

  userName: string;
  bio: string | null;
  isOnline: boolean;
  lastSeen: Date | null;
}
