const moongose =  require('mongoose')
const bycrpyt = require("bcrypt")

const UserSchema = moongose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
      },
      work: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      pic: {
        type: String,
        required: true,
      },
      verifytoken: {
        type: String,
      },
      cart: [{
        product: {
          type: moongose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      }],

})

UserSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bycrpyt.hash(this.password,12)
    }
    next()
})

// ==============ADD TO CART DATA====================
// UserSchema.methods.addcartdata = async function(cart) {
//   try {
//     this.carts.push(cart); // Push the cart object directly to the array
//     await this.save();
//     return this.carts;
//   } catch (error) {
//     console.log(error);
//     throw error; // Rethrow the error to handle it further up the chain
//   }
// };

const User = moongose.model("user", UserSchema)

module.exports = User