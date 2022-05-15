import { model, Schema } from "mongoose";

interface IUser {
  name: {
    first: string,
    last: string,
  },
  email: string,
  permission: {
    admin: boolean,
    doctor: boolean,
    user: boolean
  },
  password: string
}

const UserSchema = new Schema<IUser>({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    indexes: {
      unique: true,
    },
  },
  permission: {
    admin: {
      type: Boolean,
      default: false,
    },
    doctor: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Boolean,
      default: false,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = model<IUser>("User", UserSchema);
