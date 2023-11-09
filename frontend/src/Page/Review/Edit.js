import React from 'react'

const Edit = ({handleSaveChanges, updatedReviewData, setUpdatedReviewData}) => {
  return (
    <div>
       <div>

      <input
          type="number"
          name='rating'
          value={updatedReviewData.rating}
          onChange={(e) =>
            setUpdatedReviewData({
              ...updatedReviewData,
              rating: e.target.value,
            })
          }
        />
        <textarea
        name='comment'
          value={updatedReviewData.comment}
          onChange={(e) =>
            setUpdatedReviewData({
              ...updatedReviewData,
              comment: e.target.value,
            })
          }
        />
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  )
}

export default Edit
