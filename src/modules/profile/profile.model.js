import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  name: String,

  gender: String,

  age: Number,

  income: Number,

  state: String,

  district: String,

  city: String,

  residence_area: String,

  caste_category: String,

  pwd_status: Boolean,

  pwd_percentage: Number,

  minority_status: Boolean,

  is_student: Boolean,

  employment_status: String,

  occupation_category: String,

  bpl_status: Boolean,

  distress_status: Boolean

}, {
  timestamps: true
});

export const Profile = mongoose.model(
  "Profile",
  profileSchema
);