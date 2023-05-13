import { useEffect, useState } from "react";
import UserProductListItem from "./UserProductListItem.jsx";


export default function UserProductList ({rendered, userProducts, setSelectedId }) {
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [userProducts]);
  
  
  
  return (
    <>
      {isLoading && (
        <div className="userProducts__list">
          {Array.from({ length: 5 }).map((_, index) => (
            <UserProductListItem
              key={index}
              name=""
              isLoading={isLoading}
              rendered={rendered}
            />
          ))}
        </div>
      )}
      
      {!isLoading && (
        <div className="userProducts__list">
          {userProducts.map((product) => (
            <UserProductListItem
              key={product.id}
              name={product.name}
              id={product.id}
              isLoading={isLoading}
              rendered={rendered}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
      )}
    </>
  );
}
