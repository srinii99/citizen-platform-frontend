import { Template } from "./template.model.js";

// ➕ Create template

import { asyncHandler } from "../../utils/asyncHandler.js";

export const createTemplate = asyncHandler(async (req, res) => {


  const template = await Template.create(req.body);

  res.json({
    success: true,
    data: template
  });

});

// 📋 Get all templates
export const getTemplates = async (req, res) => {
  const templates = await Template.find();
  res.json(templates);
};

// 🔍 Get single template
export const getTemplateByType = async (req, res) => {
  const template = await Template.findOne({ type: req.params.type });

  if (!template) {
    return res.status(404).json({ error: "Template not found" });
  }

  res.json(template);
};

// ✏️ Update template
export const updateTemplate = async (req, res) => {
  try {
    const template = await Template.findOneAndUpdate(
      { type: req.params.type },
      req.body,
      { new: true }
    );

    res.json(template);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ Delete template
export const deleteTemplate = async (req, res) => {
  await Template.findOneAndDelete({ type: req.params.type });
  res.json({ message: "Template deleted" });
};