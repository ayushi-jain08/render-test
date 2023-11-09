const moongose = require('mongoose')

const ReviewSchema = new moongose.Schema({
    productId: {type: moongose.Schema.Types.ObjectId, ref: 'Product'},
    userId: {type: moongose.Schema.Types.ObjectId, ref:'user'},
    rating: Number,
    comment: String,
})

const Review = moongose.model('Review', ReviewSchema);

module.exports = Review