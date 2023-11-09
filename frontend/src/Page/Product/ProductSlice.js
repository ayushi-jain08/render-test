import { createAsyncThunk,createSlice} from "@reduxjs/toolkit"


export const fetchProduct = createAsyncThunk("data/fetchProduct", async({page,sort,value,brand},thunkAPI) => {
    try {
        const response = await fetch(`http://localhost:5001/api/getProduct?page=${page}&sort=${sort}&brand=${brand}`, {
            method: "GET",
            mode: "cors",
            "Content-Type": "application/json",
        })
        const data = await response.json()
        if(response.ok){
             return {
              products: data.products,
              totalPages: data.totalPages,
            };
        }else{
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error("An error occurred while fetching user profile.");
    }
})

export const fetchSingleProduct = createAsyncThunk(
    'data/fetchSingleProduct',
    async (id) => {
      try {
        const response = await fetch(`http://localhost:5001/api/getProduct/${id}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json', // Corrected this line
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          return data;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        throw new Error('An error occurred while fetching the product.');
      }
    }
  );

  // =======================ADD TO CART===========================
  export const FetchAddToCart = createAsyncThunk('data/FetchAddToCart', async(productId, thunkAPI) => {
    try {
      const StoredUserInfo = JSON.parse(
        localStorage.getItem("RegisterInfo")
      );
      const response = await fetch("http://localhost:5001/api/addcart",{
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({productId})
      })
      const data = await response.json()
      if(response.ok){
        return data
      } else{
        throw new Error(data.message)
    }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  })

  // ===================FETCH CART PRODUCT===========================
  export const fetchCartProduct = createAsyncThunk("data/fetchCartProduct", async(_,thunkAPI) => {
    try {
      const StoredUserInfo = JSON.parse(
        localStorage.getItem("RegisterInfo")
      );
      const response = await fetch("http://localhost:5001/api/getcart",{
        method: "GET",
        mode : 'cors',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      })
      const data = await response.json()
      if(response.ok){
        return data;
      }else {
        throw new Error(data.error);
      }
    } catch (error) {
      throw new Error('An error occurred while fetching the cart.');
    }
  })

  // =======================REMOVE ITEM FROM CART===========================

  export const removeFromCart = createAsyncThunk('data/removeFromCart', async(productId, thunkAPI) => {
    try {
      const StoredUserInfo = JSON.parse(
        localStorage.getItem("RegisterInfo")
      );
      const response = await fetch("http://localhost:5001/api/removecart", {
        method: 'DELETE',
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({productId})
      })
      const data = await response.json()
      if(response.ok){
        return data
      }else{
        throw new Error(data.message)
    }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  })

// ===================UPDATE CART QUANTITY=====================
export const fetchUpdateCartQuantity = createAsyncThunk('data/fetchUpdateCartQuantity', async({productId, operation}, thunkAPI) => {
  try {
    const StoredUserInfo = JSON.parse(
      localStorage.getItem("RegisterInfo")
    );
    const response = await fetch("http://localhost:5001/api/updatecart", {
      method:"POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
      body: JSON.stringify({productId,operation})
    })
    const data = await response.json()
    if(response.ok){
      return data
    }else{
      throw new Error(data.message)
  }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})

// ====================FETCH REVIEWS==========================
export const fetchReview = createAsyncThunk('data/fetchReview', async(productId, thunkAPI) => {
  try {
    const response = await fetch(`http://localhost:5001/api/products/${productId}/getreview`, {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json', // Corrected this line
      },
    })
    const data = await response.json()
    if(response.ok){
      return data;
    }else {
      throw new Error(data.error);
    }
  } catch (error) {
    throw new Error(error)
  }
})
// ======================POST REVIEWS======================
export const PostReview = createAsyncThunk('data/PostReview', async({productId, rating,comment}, thunkAPI) => {
  try {
    const StoredUserInfo = JSON.parse(
      localStorage.getItem("RegisterInfo")
    );
    const response = await fetch(`http://localhost:5001/api/products/${productId}/review`, {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
      body: JSON.stringify({rating,comment})
    })
    const data = await response.json()
    if(response.ok){
      return data
    }else{
      throw new Error(data.message)
  }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})
// ==================Edit REVIEW===========================
export const EditReview = createAsyncThunk('data/EditReview',async({reviewId,updatedReviewData}, thunkAPI) => {
  try {
    const StoredUserInfo = JSON.parse(
      localStorage.getItem("RegisterInfo")
    );
    const response = await fetch(`http://localhost:5001/api/${reviewId}/review`, {
      method: 'PATCH',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
      body: JSON.stringify(updatedReviewData)
    })
    const data = await response.json()
    if(response.ok){
      return data
    }else{
      throw new Error(data.message)
  }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})
// ======================DELETE REVIEW===============================
export const DeleteReview = createAsyncThunk('data/DeleteReview', async(reviewId, thunkAPI) => {
  try {
    const StoredUserInfo = JSON.parse(
      localStorage.getItem("RegisterInfo")
    );
    const response = await fetch(`http://localhost:5001/api/${reviewId}/review`, {
      method: 'DELETE',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
    })
    const data = await response.json()
    if(response.ok){
      return reviewId
    }
    else{
      throw new Error(data.message)
  }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
})

// ===================CATEGORY========================
export const fetchCategories = createAsyncThunk('data/fetchCategories', async(selectedCategory) => {
  try {
    const response = await fetch(`http://localhost:5001/api/products/${selectedCategory}`,{
      method: "GET",
      mode: "cors"
    }); // Replace with your API endpoint
    const data = await response.json();
   if(response.ok){
    return data 
   }else{
    throw new Error(data.error)
}

  } catch (error) {
    throw new Error(error);
  }
})

// ======================SEARCH API========================
export const FetchSearch = createAsyncThunk('data/FetchSearch', async(keyword) => {
  try {
    const response = await fetch(`http://localhost:5001/api/search?keyword=${keyword}`, {
      method: "GET",
      mode: "cors", 
       headers: {
        "Content-Type": "application/json",
      },

    })
    const data = await response.json();
    if(response.ok){
      return data 
     }else{
      throw new Error(data.error)
  }
  } catch (error) {
    throw new Error(error);
  }
})

// ===========================CATEGORY=========================
export const fetchMainCategory = createAsyncThunk("data/fetchMainCategory", async(_,thunkAPI) => {
  try {
    const response = await fetch("http://localhost:5001/api/categories", {
      method: "GET",
      mode: "cors"
    })
    const data = await response.json();
    if(response.ok){
      return data 
     }else{
      throw new Error(data.error)
  }
  } catch (error) {
    throw new Error(error);
  }
} )
 
// ====================GET SUBCATEGORY======================
export const fetchSubCategory = createAsyncThunk("data/fetchSubCategory", async(categoryId) => {
  try {
    const response = await fetch(`http://localhost:5001/api/categories/${categoryId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json();
    if(response.ok){
      return data 
     }else{
      throw new Error(data.error)
  }
  } catch (error) {
    throw new Error(error);
  }
})

//  =============================SUB CATEGORY PRODUCTS===================
export const fetchSubCategoryProduct = createAsyncThunk("data/fetchSubCategoryProduct", async(subcategoryID) => {
  try {
    const response = await fetch(`http://localhost:5001/api/subcategory/${subcategoryID}`,{
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json();
    if(response.ok){
      return data 
     }else{
      throw new Error(data.error)
  }
  } catch (error) {
    throw new Error(error);
  }
})
const initialState = {
    ProductInfo: [],
    singleProduct: null,
    addProduct: [],
    fetchCartItems: [], 
    allReview: [],
    categories: [],
    searchProducts: [],
    mainCategory: [],
    subCategory: [],
    subcategoryProduct: [],
    sortOrder: 'asc',
    totalPage: 0,
    loading: false,
    error: null,
}

const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      setSortOrder: (state, action) => {
        state.sortOrder = action.payload; // Update the sorting order in the state
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProduct.pending, (state) => {
            state.loading = true
            state.error = false
        })
        .addCase(fetchProduct.fulfilled, (state,action) => {
            state.loading = false;
            state.ProductInfo = action.payload.products;
            state.totalPage = action.payload.totalPages
        })
        .addCase(fetchProduct.rejected, (state,action) => {
            state.loading = false;
            state.error =action.error.message
        })
        .addCase(fetchSingleProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.singleProduct = null; // Reset singleProduct state
          })
          .addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.singleProduct = action.payload; // Store single product details
          })
          .addCase(fetchSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.singleProduct = null; // Reset singleProduct state in case of error
          })
          .addCase(FetchAddToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(FetchAddToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.addProduct.push(action.payload);
          })
          .addCase(FetchAddToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(fetchCartProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCartProduct.fulfilled, (state, action) => {
            state.loading = false;
           state.fetchCartItems = action.payload
          })
          .addCase(fetchCartProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            // Remove the item from fetchCartItems array using filter
            state.fetchCartItems = state.fetchCartItems.filter(item => item.product._id !== action.payload.productId);
          })
          .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(fetchUpdateCartQuantity.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUpdateCartQuantity.fulfilled, (state, action) => {
            state.loading = false;
            // Find the cart item by productId and update its quantity
            const updatedCartItems = state.fetchCartItems.map(item => {
              if (item.product._id === action.payload.productId) {
                return {
                  ...item,
                  quantity:
                    action.payload.operation === 'increase'
                      ? item.quantity + 1
                      : item.quantity - 1,
                };
              }
              return item;
            });
            state.fetchCartItems = updatedCartItems;
          })
          .addCase(fetchUpdateCartQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(fetchReview.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchReview.fulfilled, (state, action) => {
            state.loading = false;
            state.allReview = action.payload
          })
          .addCase(fetchReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(EditReview.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(EditReview.fulfilled, (state, action) => {
            state.loading = false
            const updatedReview = action.payload; // Assuming the API returns the updated review

            state.allReview = state.allReview.map((review) =>
              review._id === updatedReview._id ? updatedReview : review
            );
            // state.allReview = action.payload
          })
          .addCase(EditReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(DeleteReview.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(DeleteReview.fulfilled, (state, action) => {
            state.loading = false;
            const deletedReviewId = action.payload;
            // Filter out the deleted review from the array
            state.allReview = state.allReview.filter((review) => review._id !== deletedReviewId);
          })
          .addCase(DeleteReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload; // Update the state with fetched categories
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(FetchSearch.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(FetchSearch.fulfilled, (state, action) => {
            state.loading = false;
            state.searchProducts = action.payload; // Update the state with fetched categories
          })
          .addCase(FetchSearch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(fetchMainCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchMainCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.mainCategory = action.payload; // Update the state with fetched categories
          })
          .addCase(fetchMainCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(fetchSubCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchSubCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.subCategory = action.payload; // Update the state with fetched categories
          })
          .addCase(fetchSubCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(fetchSubCategoryProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchSubCategoryProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.subcategoryProduct = action.payload; // Update the state with fetched categories
          })
          .addCase(fetchSubCategoryProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
    
})


export const { setSingleProduct, resetSingleProduct } = ProductSlice.actions;

export const { setSortOrder } = ProductSlice.actions;

export default ProductSlice.reducer;