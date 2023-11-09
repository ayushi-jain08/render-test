const  mongoose  = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subcategories', required: true }]
  });

  const category = mongoose.model("categories", categorySchema)
  module.exports = category