import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteReview, EditReview, fetchReview } from '../Product/ProductSlice'
import Edit from './Edit'

const Review = ({allreview,ids}) => {
  const logged = useSelector((state) => state.user)
  const {Info, loggedIn} = logged
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [updatedReviewData, setUpdatedReviewData] = useState({
    rating: '',
    comment: '',
  });
  const dispatch = useDispatch();

  const handleEditReview = (reviewId) => {
    setEditingReviewId(reviewId);
    console.log(reviewId)

    // Find the review that matches the reviewId
    const reviewToEdit = allreview.find((review) => review._id === reviewId);

    if (reviewToEdit) {
      // Pre-fill the form with the existing review data
      setUpdatedReviewData({
        rating: reviewToEdit.rating,
        comment: reviewToEdit.comment,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (editingReviewId) {
      if (!updatedReviewData.comment.trim() || !updatedReviewData.rating){
     alert("please write something")
        return;
      }
     await dispatch(
        EditReview({
          reviewId: editingReviewId,
          updatedReviewData,
        })   
      );
      await dispatch(fetchReview(ids));
      console.log(updatedReviewData)

      // Stop editing
      setEditingReviewId(null);
    }
  };
  const deleteHandler = async(reviewId) => {
     dispatch(DeleteReview(reviewId))
  }
  
  return (
    <>
      {editingReviewId && (
        <Edit handleSaveChanges={handleSaveChanges} updatedReviewData={updatedReviewData} setUpdatedReviewData={setUpdatedReviewData}/>
      )}
        <ul>
        {allreview.map((review) => (
            <>
          <li key={review._id}>
            <img src={review.userId.pic} alt="picture" width={50} height={50}/>
            <p>{review.userId.name}</p>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
           {loggedIn && Info && Info._id === review.userId._id  && <button onClick={() => handleEditReview(review._id)}>edit</button>}
          {loggedIn &&  Info && Info._id === review.userId._id  && <button onClick={() => deleteHandler(review._id)}>Delete</button>}
          </li>
          </>
        ))}
      </ul>
    
    </>
  )
}

export default Review
