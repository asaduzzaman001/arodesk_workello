export type UserRole = "OWNER" | "MEMBER";

export interface IUser {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
