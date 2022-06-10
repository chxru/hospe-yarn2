import { model, Schema } from "mongoose";
import { DB } from "@hospe/types";

const UserSchema = new Schema<DB.User.Data>({
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

export const UserModel = model<DB.User.Data>("User", UserSchema);
