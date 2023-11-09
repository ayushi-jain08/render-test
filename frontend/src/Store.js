import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./CreateSlice"
import ProductSlice from "./Page/Product/ProductSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        products: ProductSlice
    },
})

export default store