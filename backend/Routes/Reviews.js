const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Review = require("../Model/Review")

// ====================POST REVIEWS==========================
router.post("/products/:productId/review", auth,async(req,res) => {
try {
    const {productId} = req.params;
    const userId = req.user._id;
    const { rating, comment } = req.body;

    console.log(userId)

    const review = await new Review({
        productId,
        userId,
        rating,
        comment
    })
    await review.save();
    res.status(200).json({ message: 'Review created successfully' })
} catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
}
})

// ====================GET REVIEWS==========================
router.get("/products/:productId/getreview", async(req,res) => {
    try {
        const {productId} = req.params;
        const reviews = await Review.find({productId}).populate('userId', 'name pic')

        console.log(reviews)
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
} )

// ====================EDIT REVIEWS==========================
router.patch("/:reviewId/review", auth, async(req,res) => {
    const {reviewId} = req.params;
try {
const {rating, comment} = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
       req.body,
        { new: true }
      );
      if (!updatedReview) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      res.status(200).json(updatedReview);
} catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Internal Server Error' })
}
})

// =========================DELETE REVIEW==============================
router.delete("/:reviewId/review", auth, async(req,res) => {
    const {reviewId} = req.params
    try {
        const review = await Review.findById({_id:reviewId})
        if (!review) {
            return res.status(404).json({ error: 'No review' });
          }
if(review.userId.toString() !== req.user._id.toString()){
    return res.status(403).json({ error: 'Unauthorized: You can only delete your own reviews' });
}
await review.deleteOne();

res.status(200).json({success: true, message: "review deleted"});     
    } catch (error) {
        console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Internal Server Error' })
    }
})
module.exports = router;