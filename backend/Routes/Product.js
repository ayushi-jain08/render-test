const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const Product = require("../Model/Product");
const auth = require("../middleware/auth");
const User = require("../Model/User")


cloudinary.config({
  cloud_name: "ayushicoder",
  api_key: "132166264294926",
  api_secret: "xm4XtEkHIpQH4YVsdcflComdxpU",
});
// =============CREATE PRODUCT==================
router.post("/createproduct", async (req, res) => {
 
  const imageFiles = req.files.img;
  const imageUrls = [];
  const folder = "images";
  for (const file of imageFiles) {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder,
    });
    imageUrls.push(result.url);
  }
  try {
    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      desc: req.body.desc,
      price: req.body.price,
      category: req.body.category,
      subcategory: req.body.subcategory,
      images: imageUrls, // Store image URLs as an array
    });
    console.log(imageUrls);
    const savedProduct = await product.save();
    res.status(201).json({
      message: "Product created successfully.",
      data: savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

// =====================GET ALL PRODUCT========================
router.get("/getproduct", async(req,res) => {
  try {

    const page = parseInt(req.query.page) || 1; 
    const perPage = 4; 

    const startIndex = (page - 1) * perPage;
    const brandFilter = req.query.brand ? { brand: req.query.brand } : {}

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    let query = Product.find(brandFilter)
    .skip(startIndex)
    .limit(perPage);


  if (req.query.sort) {
    // Apply sorting if a sorting option is provided
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    query = query.sort({ price: sortDirection });
  }
  
  const products = await query;
    if(!products){
       res.status(402).json({
           meassage: "no product found"
       })
    }else{
      res.status(200).json({
        products,
        totalProducts,
        totalPages,
        currentPage: page,
      });
    }
    console.log("Products retrieved from database:", products);
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
        message: error,
      });
  }
})
// ======================GET SINGLE PRODUCT=======================
router.get("/getproduct/:id", async(req,res) => {
    try {
        const products = await Product.findById(req.params.id)

        if(products){
            res.status(200).json(products)
        }else{
            res.status(400).json({
                message: "Product Not Found"
              })
        }
    } catch (error) {
      console.error(error);
        res.status(500).json({meassage: `Server Error: ${error}`})
    }
})


// ====================ADD TO CART==============================
router.post("/addcart", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }
    const products = await Product.findById(productId);

    if (!products) {
      return res.status(404).json({ error: "Product not found" });
    }
    const existingCartItem = user.cart.find(cartItem => cartItem.product.equals(products._id));

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      user.markModified('cart');
    } else {
      user.cart.push({ product: products._id, quantity: 1 });
    }
  const userSave =   await user.save();
    res.status(200).json({ message: "Product added to cart" , products});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// =========================FETCH CART PRODUCTS======================
router.get("/getcart", auth, async(req,res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product')
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid User' });
    }

    const cartWithSubtotal = user.cart.map((cartItem) => ({
      ...cartItem.toObject(),
      subtotal: cartItem.product.price * cartItem.quantity,
    }));
    res.status(200).json(cartWithSubtotal);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
 
// ================INCREASE AND DECREASE QTY IN CART=================
router.post("/updatecart", auth, async(req,res) => {
  try {
    const {productId, operation} = req.body

    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }
    const cartItems = user.cart.find((cartitem) => cartitem.product.toString() === productId);

    if (!cartItems) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
if(operation === "increase"){
  cartItems.quantity += 1
}else if (operation === "decrease") {
  if (cartItems.quantity > 1) {
    cartItems.quantity -= 1;
  }
}
user.markModified("cart");
await user.save();

res.status(200).json({ message: "Cart quantity updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})


// ===================DELETE FROM CART======================
router.delete("/removecart", auth,async(req,res) => {
  try {
    const {productId} = req.body
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }
    const productIndex = user.cart.findIndex(
      cartItem => cartItem.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }
    // Remove the product from the cart array
    user.cart.splice(productIndex, 1);

    await user.save();
    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

// ===================CATEGORY============================
router.get("/products/:category", async(req,res) => {
  try {
   const {category} = req.params
   
   if (!category) {
    return res.status(400).json({ error: 'Category parameter is required' });
  }
const products = await Product.find({category});
res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
// ======================LIVE SEARCH===================
router.get("/search", async(req,res) => {
  const { keyword } = req.query;

  try {
    if (!keyword) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in name
        { category: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in category
        { brand: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in brand
      ],
    });

    res.status(200).json(results);
   
  } catch (error) {
    res.status(401).json({
      success: false,
      error
    })
  }
})

// ==============SORTING=====================
router.get("/sort", async (req,res) => {
  try {
    const {sortBy, sortOrder} = req.query

    const sortCriteria = {}
    sortCriteria[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const sortProduct = await Product.find().sort(sortCriteria)

    res.status(200).json(sortProduct);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Internal Server Error' })
  }
})


module.exports = router;
