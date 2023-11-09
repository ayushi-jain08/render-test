const express = require("express");
const router = express.Router();
const Subcategory = require("../Model/SubCateory");
const cloudinary = require("cloudinary").v2;
const Product = require("../Model/Product")

cloudinary.config({
  cloud_name: "ayushicoder",
  api_key: "132166264294926",
  api_secret: "xm4XtEkHIpQH4YVsdcflComdxpU",
});
router.post("/subcategories", async (req, res) => {
  if (!req.files || !req.files.photo) {
    return res.status(400).json({ message: "Image file is required." });
  }
  const file = req.files.photo;
  const folder = "images";

  const result = await cloudinary.uploader.upload(file.tempFilePath, { folder });
  try {
    const { name, categoryId } = req.body;
    const subcategory = new Subcategory({
      name,
      image: result.secure_url,
      category: categoryId,
    });
    const saveSubcategory = await subcategory.save();
    res.status(200).json(saveSubcategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error", err });
  }
});
// ==================GET SUBCATEGORY======================
router.get('/subcategories', async (req, res) => {
    try {
      const subcategories = await Subcategory.find();
      res.status(200).json(subcategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error', error });
    }
  });

  router.get('/subcategory/:subcategoryID', async (req, res) => {
    try {
     const {subcategoryID} = req.params
      console.log('Subcategory ID:', subcategoryID);
      const products = await Product.find({ subcategory: subcategoryID });
      console.log('Products:', products); 
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found for the specified subcategory." });
      }
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error', error });
    }
  });
 
module.exports = router;
