import { Document } from "mongoose";

interface Users extends Document {
  readonly username: string;
  readonly name: string;
  readonly email: string;
  password: string;           // not readonly => Edit 
  readonly role: Role;
  readonly active: boolean;
  googleId: string;
  hasPassword: boolean;
  passwordChangedAt: Date | number;
  passwordResetCode: string | undefined;
  passwordResetCodeExpires: Date | number | undefined;
  passwordResetCodeVerify: boolean | undefined;
  image: string;
}

type Role = "admin" | "employee" | "user";

export default Users;
