import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainCategory } from "../../Page/Product/ProductSlice";
import { NavLink } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.products);
  const { mainCategory } = category;
  console.log(mainCategory);
  useEffect(() => {
    dispatch(fetchMainCategory());
  }, [dispatch]);
  return (
    <>
      <div className="main-category">
        {mainCategory.map((item) => {
          return (
            <ul>
              <li>
                <NavLink to={`/category/${item._id}`}>{item.name}</NavLink>
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default Category;
