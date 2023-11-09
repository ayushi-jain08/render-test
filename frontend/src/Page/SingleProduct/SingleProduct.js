import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FetchAddToCart, fetchReview, fetchSingleProduct, resetSingleProduct } from '../Product/ProductSlice'
import Image from './Image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from '../Review/Review'
import ReviewPost from '../Review/ReviewPost'
import StarIcon from '@mui/icons-material/Star';

const SingleProduct = () => {
  // const [image, setImage] = useState([])
const dispatch = useDispatch()
const { ids } = useParams()

const userInfo = useSelector((state) => state.user)
const {Info, loggedIn} = userInfo
  const selector = useSelector((state) => state.products);
  const { singleProduct, loading, error, allReview } = selector;
  const {_id, name, brand, desc, price, images } = singleProduct || {};

  useEffect(() => {

    if (ids && ids !== "") {
      dispatch(fetchSingleProduct(ids));
      dispatch(fetchReview(ids))

    // setImage(images)
    }

  }, [dispatch, ids]);

const addToCartHandler = () => {
  if(!loggedIn){
    toast.warning('Please log in to add items to your cart.');
    return;
  } toast.success('Product added to cart!', {
    position: toast.POSITION.TOP_CENTER
  });
  dispatch(FetchAddToCart({_id}))
  
 
  console.log(_id)
}

if (loading) {
    return <div>Loading...</div>;
   
  }

  if (error) {
    return <div>Error:{error.message}</div>;
  }
 
  return (
    <>
      <div>
       
      {/* {images.map((image, index) => (
        <img key={index} src={image} alt="" width={200} height={200} />
      ))} */}
      {images && images.length > 1 && (
 <Image image={images}/>
)}
      {/* <img src={images[1]} alt="" width={200} height={200}/> */}
      <h2>{name}</h2>
      <h3>{brand}</h3>
      <p>{desc}</p>
      <p>{price}</p>
      <p><StarIcon/>( {allReview.length} review)</p>
      <button onClick={addToCartHandler}>
        Add To Cart
      </button>
    </div>
    <br/>
    <ReviewPost productId={ids}/>
    <hr/>
   {allReview && allReview.length > 0 ? ( <Review allreview={allReview} ids={ids}/>):( <p>NO Review</p>)}
    <ToastContainer/>
    </>
  )
}

export default SingleProduct
