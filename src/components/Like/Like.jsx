import "./like.css";
import { useContext, useState } from "react";
import { UserContext } from "../../App.jsx";
import baseHost from "../../assets/baseHost.js";

export default function Like({liked, likes, isLoading, id, setLikesCount }) {
  
  const [isLiked, setIsLiked] = useState(liked);
  const { logged } = useContext(UserContext);
  
  
  

  const like = () => {
    
      fetch(baseHost + `/likes/${id}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return  response.json();
          }
        })
        .then((data) => {
          setIsLiked(data.liked);
          setLikesCount(data.total_likes.count);
        });
  };

  const handleClick = (e) => {
    if(logged){
      setIsLiked(!isLiked)
      if(isLiked){
        setLikesCount(likes-1)
      }else{
        setLikesCount(likes+1)
      }
      like();
    }
  };

  return (
    <div className="like__container">
      <div className="like__number">{isLoading ? "" : likes}</div>
      <div className="like__icon">
        <svg
          onClick={handleClick}
          className={
            isLoading
              ? "like__icon-svg isLoading"
              : isLiked
              ? "like__icon-svg liked"
              : "like__icon-svg"
          }
          viewBox="0 0 50 50"
          width="20px"
          height="20px"
        >
        </svg>
      </div>
    </div>
  );
}
