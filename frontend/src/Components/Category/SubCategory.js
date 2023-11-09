import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { fetchSubCategory } from '../../Page/Product/ProductSlice'
import "./Category.css"
const SubCategory = () => {
    const [subcategory, setSubcategory] = useState(null);
    const {categoryId} = useParams()
    const dispatch = useDispatch()
    const category = useSelector((state) => state.products)
    const {subCategory} = category || []
useEffect(() => {
    dispatch(fetchSubCategory(categoryId))
},[dispatch,categoryId])
console.log(subCategory)
if (subCategory.length === 0) {
    return <div>No subcategories available.</div>;
  }
  return (
    <div className='sub-category'>
    <span className='sub-head'>  {subCategory.name}</span>

    <div className="sub">
    {subCategory && subCategory.subcategories.map((item) => {
        return(
           <>
           <div className='sub-cat'>
         <div className="img">
         <img src={item.image} alt="" width={50} height={50}/>
         </div>
            <h1><NavLink to={`/subcategories/${item._id}`}>{item.name}</NavLink></h1>
           </div>
           </>
        )
      })}
    </div>
    </div>
  )
}

export default SubCategory
