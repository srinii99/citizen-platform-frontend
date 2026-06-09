import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {

    console.log("AUTH HEADER:", req.headers.authorization);

    const token =
      req.headers.authorization?.split(" ")[1];

    console.log("TOKEN:", token);

    if (!token) {
      throw new Error("No token");
    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (err) {

    console.log("AUTH ERROR:", err.message);

    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};