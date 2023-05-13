import Header from "../Header/Header.jsx";
import './productPage.css'
import ProductFilter from "../ProductFilter/ProductFilter.jsx";
import ProductList from "../ProductList/ProductList.jsx";
import { useEffect, useState } from "react";
const BaseHost = process.env.baseApi;



export default function ProductPage() {
  
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  
  
  useEffect(() => {
    fetch(BaseHost + '/category', {
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
