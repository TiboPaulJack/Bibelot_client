import "./productCard.css";
import "./productCardLoading.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Like from "../Like/Like.jsx";

export default function ProductCard(props) {
  const navigate = useNavigate();
  
  const {isLoading} = props;
  const [likesCount, setLikesCount] = useState(props.like);
  const tags = props.tags;
  const id = props.id;
  
  

  const handleClick = () => {
    !isLoading &&
    navigate(`/model/${id}`)
  }

  return (
    <div className={isLoading ? "productCard isLoading" : "productCard"}>
      <div
        className={isLoading ? "card__image isLoading" : "card__image"}
        onClick={handleClick}
      >
        <img
          className={
            isLoading
              ? "card__image-img isLoading"
              : "card__image-img"
          }
          src={props.url}
          alt=""
        />
      </div>
      <div className="card__infos">
        <div className="card__infos-left">
          <div
            className={
              isLoading ? "card__infos-title isLoading" : "card__infos-title"
            }
          >
            {props.name}
          </div>
          <div
            className={
              isLoading ? "card__infos-author isLoading" : "card__¨infos-author"
            }
          >


          </div>
        </div>
        <div className="card__infos-right">
          <Like
                key={props.id}
                likes={likesCount}
                isLoading={isLoading}
                id={props.id}
                liked={props.liked}
                setLikesCount={setLikesCount}
          />
        </div>
      </div>
        <div className="card__tags">{ tags && tags.map( ( tag ) => (
          <span className="tag-item" key={tag}>{ tag }</span>
        ) ) }
        </div>

    </div>
  );
}
