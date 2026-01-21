import { getUserPublicById } from "../services/user.service.js";
import { ensureProfile, getProfileByUserId } from "../services/profile.service.js";

export async function myProfile(req, res, next) {
  try {
    const userId = req.user.userId;

    const user = await getUserPublicById(userId);
    if (!user) {
      return res.status(404).json({ ok: false, error: "not_found", message: "user not found" });
    }

    await ensureProfile(userId);
    const p = await getProfileByUserId(userId);

    return res.status(200).json({
      ok: true,
      profile: {
        ...user,
        fullName: p?.fullName ?? "",
        bio: p?.bio ?? "",
        avatarUrl: p?.avatarUrl ?? ""
      }
    });
  } catch (e) {
    next(e);
  }
}
