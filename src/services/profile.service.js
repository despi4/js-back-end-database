import { Profile } from "../models/profile.model.js";

export async function ensureProfile(userId) {
  const existing = await Profile.findOne({ userId });
  if (existing) return existing;
  return Profile.create({ userId });
}

export async function getProfileByUserId(userId) {
  return Profile.findOne({ userId }).lean();
}

export async function updateProfile(userId, data) {
  const allowed = {
    fullName: typeof data.fullName === "string" ? data.fullName : undefined,
    bio: typeof data.bio === "string" ? data.bio : undefined,
    avatarUrl: typeof data.avatarUrl === "string" ? data.avatarUrl : undefined,
  };

  Object.keys(allowed).forEach((k) => allowed[k] === undefined && delete allowed[k]);

  return Profile.findOneAndUpdate(
    { userId },
    { $set: allowed },
    { new: true, upsert: true }
  ).lean();
}

