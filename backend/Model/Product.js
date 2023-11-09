const moongose = require('mongoose')
const ProductSchema = moongose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: { // Add the category field
        type: String,
        required: true,
        default: 'spices',
        enum: ['spices', 'women', 'grains', 'men'], // Specify the allowed categories
      },
      subcategory: { type: moongose.Schema.Types.ObjectId, ref: 'Subcategory' , required:true},
    images: [
        {
          type: String,
          required: true
        }
      ],
},
   { timestamps: true}
)

const Product = moongose.model("Product", ProductSchema)

module.exports = Product