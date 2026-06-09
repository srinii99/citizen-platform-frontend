export const validateTemplate = (req, res, next) => {

  const { type, title, content } = req.body;

  // ✅ Type validation
  if (!type) {
    return res.status(400).json({
      success: false,
      error: "type is required"
    });
  }

  // ✅ Title validation
  if (!title) {
    return res.status(400).json({
      success: false,
      error: "title is required"
    });
  }

  // ✅ Content validation
  if (!content || !Array.isArray(content)) {
    return res.status(400).json({
      success: false,
      error: "content array is required"
    });
  }

  next();
};