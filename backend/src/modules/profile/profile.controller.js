import { User } from "../user/user.model.js";
import { Profile } from "./profile.model.js";


export const createProfile = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    
    const user_id = req.user.user_id;

    const profile = await Profile.findOneAndUpdate(
      { user_id },
      req.body,
      { new: true, upsert: true }
    );
    await User.findByIdAndUpdate(
      user_id,
      {
        ...req.body,
        profile_completed: true,
      }
    );

    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  const profile = await Profile.findOne({ user_id: req.user.user_id });
  res.json(profile);
};