import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchProduct } from './ProductSlice'
import "./Product.css"
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {setSortOrder} from "../Product/ProductSlice"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Product = () => {
  const [sortOrder, setSortOrder] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalsPages, setTotalsPages] = useState(1);
  const [brandOptions, setBrandOptions] = useState([])
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.products)
  const {ProductInfo, loading, error, totalPage} =  selector
  

  useEffect(() => {
dispatch(fetchProduct({page:currentPage, sort:sortOrder, clicked:false, brand: brandFilter  }))
setTotalsPages(totalPage)
  },[dispatch, currentPage, brandFilter])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleSortChange = (order) => {
      setSortOrder(order);
      dispatch(fetchProduct({ page: currentPage, sort:order, brand:brandFilter  }));
    
  };
  const handleBrandChange = async (brand) => {
    setBrandFilter(brand)
    dispatch(fetchProduct({ page: currentPage, brand:brand  }));
  }
  // useEffect(() => {
  //   // Extract and set available brand options from the fetched products
  //   const uniqueBrands = [...new Set(ProductInfo.map((product) => product.brand))];
  //   setBrandOptions(uniqueBrands);

  // }, [ProductInfo]);

  console.log(ProductInfo)
  if (loading) {
    return <div>Loading...</div>;
  }
 
  return (
    <>
      <div className="all-products">
        <div className="container">
         <label>
        Filter By Brand:
        <select onChange={(e) => handleBrandChange(e.target.value)} value={brandFilter}>
        <option value="Amul">Amul</option>
        <option value="Maharaja">Maharaja</option>
        <option value="asheerwad">asheerwad</option>
        <option value="addidas">addidas</option>
        </select>
      </label>
        <h2 className='head'>All Products</h2>
        <div>
            <select
              name=""
              id=""
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOrder}
            >
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </div>
        <div className="product">
         
             {ProductInfo.map((item) => {
            const {name, brand, desc, price, images,_id, category} = item
            return(
      <>
<div className="product-details">
<div className="img">
  <img src={images[0]} alt="" width={200} height={200} />
</div>
<div className="content">
  <Link to={`/product/${_id}`}>
  <h2>{name}</h2>
  <h3>{brand}</h3>
  <p>{desc}</p>
  <p>{category}</p>
  </Link>
  <span>{price}</span>
</div>
</div>
      </>
            )
          })}
       </div>
        </div>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPage }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  )
}

export default Product
