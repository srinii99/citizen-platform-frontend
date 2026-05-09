import { User } from "./auth.model.js";
import jwt from "jsonwebtoken";


// 📲 Send OTP
export const sendOTP =
  async (mobile) => {

    const otp =
      Math.floor(
        100000 +
        Math.random() * 900000
      ).toString();

    let user =
      await User.findOne({
        mobile
      });

    // 👤 Create new user
    if (!user) {

      user = new User({

        mobile,

        role: "USER"
      });
    }

    // 🔐 Save OTP
    user.otp = otp;

    user.otp_expiry =
      new Date(
        Date.now() +
        5 * 60 * 1000
      );

    await user.save();

    // ⚠️ Replace later with SMS provider
    console.log(
      `📲 OTP for ${mobile}: ${otp}`
    );

    return {

      success: true,

      message: "OTP sent"
    };
  };


// ✅ Verify OTP
export const verifyOTP =
  async (mobile, otp) => {

    const user =
      await User.findOne({
        mobile
      });

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    if (user.otp !== otp) {
      throw new Error(
        "Invalid OTP"
      );
    }

    if (
      user.otp_expiry <
      new Date()
    ) {
      throw new Error(
        "OTP expired"
      );
    }

    // 🎟 Generate JWT
    const token =
      jwt.sign(

        {
          user_id: user._id,

          mobile: user.mobile,

          role: user.role
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d"
        }
      );

    return {

      success: true,

      token,

      user: {

        _id: user._id,

        mobile: user.mobile,

        role: user.role
      }
    };
  };