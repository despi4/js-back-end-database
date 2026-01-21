import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true }, // UUID из Postgres
    fullName: { type: String, default: "" },
    bio: { type: String, default: "" },
    avatarUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", ProfileSchema);
