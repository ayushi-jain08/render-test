// models/Subcategory.js
const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: String,
  image: String, // URL to the subcategory image
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
});

module.exports = mongoose.model('subcategories', subcategorySchema);
