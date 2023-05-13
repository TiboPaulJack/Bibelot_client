import './productList.css'
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useContext, useEffect, useState } from "react";
import BaseHost from "../../assets/baseHost.js";


export default function ProductList({ filter }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect( () => {
    
    let url = BaseHost + "/model";
    if (filter !== "") {
      url += `?category=${filter}`;
    }

    fetch(url, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`
      }})
      .then((response) => response.json())
      .then((data) => {
        return data.map((item) => {
          const pics = new Uint8Array(item.picture.data);
          const blob = new Blob([pics], { type: "image/png" });
          item.picture = URL.createObjectURL(blob);
          return item;
        });
      })
      .then((data) => setCards(data))
      .then(() => setIsLoading(false));
  }, [filter]);

  return (
    <div className="productList">
      {isLoading &&
        Array.from({ length: 12 })
          .map((_, index) => ({
            id: index,
            pseudo: "",
            name: "",
            like: "",
            picture: "",
          }))
          .map((card) => (
            <ProductCard
              id={card.id}
              key={card.id}
              pseudo={card.pseudo}
              name={card.name}
              like={card.like}
              liked={card.liked}
              tags={card.tags}
              url={card.picture}
              isLoading={isLoading}
            />
          ))}
      {!isLoading &&
        cards.map((card) => (
          <ProductCard
            id={card.id}
            key={card.id}
            pseudo={card.pseudo}
            name={card.name}
            tags={card.tags}
            like={card.like}
            liked={card.liked}
            url={card.picture}
            isLoading={isLoading}
          />
        ))}
    </div>
  );
}
