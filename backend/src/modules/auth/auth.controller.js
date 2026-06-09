import * as authService from "./auth.service.js";

export const sendOTPController = async (req, res) => {
  try {
    const { mobile } = req.body;
    const result = await authService.sendOTP(mobile);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const verifyOTPController = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const result = await authService.verifyOTP(mobile, otp);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};