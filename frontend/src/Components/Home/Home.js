import React, { useEffect, useState } from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchProduct } from '../../Page/Product/ProductSlice'

const Home = () => {
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState('')
  const Category = useSelector((state) => state.products)
  const {categories, loading, error, ProductInfo} = Category

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory)
    // Dispatch the action to fetch products for the selected category
    if (selectedCategory) {
      dispatch(fetchCategories(selectedCategory))
    }
  };
  useEffect(() => {
    dispatch (fetchProduct())
    // Fetch all categories when the component mounts
    dispatch(fetchCategories())
  }, [dispatch])

  const cate = [...new Set(ProductInfo.map((product) => product.category))];
  console.log(cate)
  console.log(categories)
  return (
    <>
     <div className="home">
     <div>
      <label>Select Category:</label>
      <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">All</option>
        {cate.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
    {categories.map((item) => {
      return(
        <>
       <div key={item._id}> 
              <h2>{item.name}</h2>
              <img src={item.images[0]} alt="" width={200} height={200} />
              <p>{item.brand}</p>
            </div>
        </>
      )
    })}
    
    
     </div>
    </>
  )
}

export default Home
