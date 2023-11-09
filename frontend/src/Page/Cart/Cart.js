import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartProduct, fetchUpdateCartQuantity, removeFromCart } from '../Product/ProductSlice'
import Image from '../SingleProduct/Image'

const Cart = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.products)
  const {fetchCartItems, loading} = selector
 
  
  const removeCartItem = async(productId) => {
    try {
    await  dispatch(removeFromCart(productId)).unwrap()
    dispatch(fetchCartProduct());
    } catch (error) {
      console.log(error);
    }
  }

  const handleQuantityChange = async(productId, operation) => {
    try {
     await dispatch(fetchUpdateCartQuantity({productId, operation}))
     dispatch(fetchCartProduct());
    } catch (error) {
       console.log(error)
      }
}
useEffect(() => {
  dispatch(fetchCartProduct())
},[dispatch])

if (loading) {
  return <div>Loading...</div>;
 
}

  return (
    <>
      <div>
      <h2>Your Cart</h2>
      <ul>
        {fetchCartItems.map(item => (
          <li key={item.product._id}>
            <h3>{item.product.name}</h3>
            <h2>{item.product.brand}</h2>
            <h3>{item.product.price}</h3>
            <p>Subtotal: ${item.subtotal}</p>
            <p>Quantity: {item.quantity}</p>
            <button style={{width:50, height:50, fontSize:20}} onClick={() => handleQuantityChange(item.product._id, "increase")}>+</button>
            <button style={{width:50, height:50,fontSize:20}} onClick={() => handleQuantityChange(item.product._id, "decrease")}>-</button>
         {/* <img src={item.product.images[0]} alt="" /> */}
         {item.product.images.map((imgs) => {
          return(
            <img src={imgs} alt="" width={200} height={200}/>
          )
         })}
         
         <button onClick={() => removeCartItem(item.product._id)}> Remove</button>

          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default Cart
