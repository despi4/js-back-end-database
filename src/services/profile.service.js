import { Profile } from "../models/profile.model.js";

export async function ensureProfile(userId) {
  const existing = await Profile.findOne({ userId });
  if (existing) return existing;
  return Profile.create({ userId });
}

export async function getProfileByUserId(userId) {
  return Profile.findOne({ userId }).lean();
}
