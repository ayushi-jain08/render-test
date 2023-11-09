import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchSearch } from '../Product/ProductSlice'

const Search = () => {
    const [keyword, setkeyword] = useState('')
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.products)
    const {searchProducts} = selector

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (keyword.trim() !== '') {
          // Only make the API request if the keyword is not empty
          dispatch(FetchSearch(keyword));
        }
      }, 1000); // Adjust the delay as needed (e.g., 500ms)
  
      // Cleanup the timeout on unmount or if the keyword changes
      return () => clearTimeout(delayDebounceFn);
    }, [keyword, dispatch]);
  
    
      const handleSearch = (e) => {
        e.preventDefault(); 
      };
    
  return (
    <>
    <form  onSubmit={handleSearch}>
        <label htmlFor="#">Search</label>
        <input type="text" name="search" id="" placeholder='search here... 
        ' value={keyword} onChange={(e) => setkeyword(e.target.value)}/>
        <button type='submit'>Search</button>
    </form>
    {searchProducts.map((item) => {
        return(
            <h1>{item.name}</h1>
        )
    })}
    </>
  )
}

export default Search
