import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostReview, fetchReview } from '../Product/ProductSlice'
import { useNavigate, useParams } from 'react-router-dom'

const ReviewPost = ({productId}) => {
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState('')
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.user)
    const {loggedIn} = selector
    const navigate = useNavigate()

const hanldePostReview = async (e) => {
    e.preventDefault()
    try {
       if(!comment || !rating){
alert("please write spomething")
       }
       if(loggedIn){
        await dispatch(PostReview({ productId, comment, rating }));
        await dispatch(fetchReview(productId))
        // Reset the form fields
        setComment('');
        setRating('');
       }else{
        navigate("/login")
       }
      
       // Provide feedback to the user (e.g., success message)
      } catch (error) {
        // Handle error (e.g., show an error message)
        console.error('Error posting review:', error);
      }
}
  return (
    <div>
      Post Review here....
      <form method='POST'>
        <label htmlFor="comment">Comment</label> <br/>
        <input type="number"  min="1"
          max="5" name='rating' value={rating} onChange={(e) => setRating(e.target.value)} />
        <input type="text" placeholder='comment here...' name='comment' value={comment} onChange={(e) => setComment(e.target.value)}/>
        <button onClick={hanldePostReview}>Submit</button>
      </form>
    </div>
  )
}

export default ReviewPost
