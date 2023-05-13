import Header from "../Header/Header.jsx";
import './productPage.css'
import ProductFilter from "../ProductFilter/ProductFilter.jsx";
import ProductList from "../ProductList/ProductList.jsx";
import { useEffect, useState } from "react";
import baseApi from "../../assets/baseApi.js";


export default function ProductPage() {
  
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  
  
  useEffect(() => {
    fetch(baseApi + '/category', {
      method: "GET",
    }).then((res) => res.json()
    ).then((data) => setCategories(data))
  }, []);
  
  
    return (
      <>
        <Header />
          <div className="productPage">
            <ProductFilter categories={categories}
                           filter={setFilter}
            />
            <ProductList filter={filter} />
          </div>
      </>


    )
}
