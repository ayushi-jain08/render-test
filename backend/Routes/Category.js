const express = require("express");
const router = express.Router();
const Category = require("../Model/Category");

// =======================CREATE CATEGORY=================================
router.post("/categories", async (req, res) => {
  try {
    const { name, subcategories } = req.body;
    const category = new Category({ name, subcategories });
    await category.save();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error });
  }
});

// =====================GET CATEGORY=========================
router.get("/categories/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).populate(
      "subcategories"
    );
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", err });
  }
});

//   ============================ALL GET CATEGORY=======================
router.get("/categories", async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Server error", err });
  }
});

// =====================UPDATE CATEGORY===================
router.patch("/categories/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const UpdatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true }
    );
    if (!UpdatedCategory) {
        return res.status(404).json({ error: 'category not found' });
      }
  res.status(200).json(UpdatedCategory)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error });
  }
});

module.exports = router;
