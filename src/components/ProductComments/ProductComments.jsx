import Comment from "./Comment.jsx";
import './productComments.css'
import CommentAdd from "./CommentAdd.jsx";
import { useEffect, useState } from "react";
import baseHost from "../../assets/baseHost.js";


export default function ProductComments({ id }) {
  const [comments, setComments] = useState([]);
  
  const freshComment = (comment) => {
    setComments([comment,...comments]);
  };

  useEffect(() => {
    getComments();
  }, [setComments]);

  const getComments = () => {
    fetch(baseHost + `/comments/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  return (
    <section className="productComments">
      <CommentAdd freshComment={freshComment}/>
      <div className="comment__list">
        {comments.map((comment, i) => {
          return (
            <Comment
              key={i}
              comment={comment}
            />
          );
        })}
      </div>
    </section>
  );
}
