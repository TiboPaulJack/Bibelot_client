import './productList.css'
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useEffect, useState } from "react";
import s3GetObject from "../../utils/S3GetObject.js";



export default function ProductList({ filter }) {
  
  const baseApi = import.meta.env.VITE_BASE_API
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  
  
  useEffect(() => {
    let url = baseApi + "/model";
    if (filter !== "") {
      url += `?category=${filter}`;
    }
    
    fetch(url, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const promises = [];
        data.forEach((card) => {
          promises.push(s3GetObject(card.picture)
            .then((url) => {
              card.picture = url;
              return card;
            })
          );
        });
        return Promise.all(promises);
      })
      .then((updatedCards) => {
        setCards(updatedCards);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
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
              isLoading={isLoading}
            />
          ))}
      {!isLoading &&
        cards &&
          cards.map( ( card ) => (
            <ProductCard
              id={ card.id }
              key={ card.id }
              pseudo={ card.pseudo }
              name={ card.name }
              tags={ card.tags }
              like={ card.like }
              liked={ card.liked }
              url={ card.picture }
              isLoading={ isLoading }
              setIsLoading={ setIsLoading }
            />
          )
        )}
    </div>
  );
}
