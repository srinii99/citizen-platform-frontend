export const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        error: "Admin access required"
      });
    }

    next();

  } catch (err) {
    res.status(403).json({
      error: "Forbidden"
    });
  }
};