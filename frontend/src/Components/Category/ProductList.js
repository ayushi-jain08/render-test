import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategoryProduct } from '../../Page/Product/ProductSlice'
import { useParams } from 'react-router-dom'

const ProductList = () => {
    const {subcategoryID} = useParams()
    console.log(subcategoryID)
    const dispatch = useDispatch()
    const categoryProduct = useSelector((state) => state.products)
    const {subcategoryProduct} = categoryProduct 
    useEffect(() => {
        dispatch(fetchSubCategoryProduct(subcategoryID))
    },[dispatch, subcategoryID])

    console.log(subcategoryProduct)
  return (
    <div>
      {subcategoryProduct.length !==0 && subcategoryProduct.map((item) => {
        return(
         <>
          <h1>{item.name}</h1>
          <img src={item.images[0]} alt=""  width={50} height={50}/>
         </>
        )
      })}
    </div>
  )
}

export default ProductList
