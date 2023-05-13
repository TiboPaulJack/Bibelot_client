import baseHost from "../../assets/baseHost.js";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App.jsx";


export default function CommentAdd({ freshComment }) {
  const [newComment, setNewComment] = useState({});
  const { logged } = useContext(UserContext);
  const modelId = useParams().id;

  const addComment = () => {
    freshComment(newComment);
    document.getElementById("inputComment").value = "";
    fetch(baseHost + "/comments", {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newComment.content,
        model_id: newComment.model_id,
      }),
    }).then((res) => {
      if (res.status === 201) {
        setNewComment({});
        return res.json();
      }
    });
  };

  const handleInputChange = (e) => {
    if(logged){
      const { name, value } = e.target;
      setNewComment({ [name]: value, model_id: modelId });
    }else{
      e.target.value = "";
    }
  };

  return (
    <div className="commentAdd">
      <div className="commentAdd__avatar">
        <img src="https://via.placeholder.com/150" alt="avatar" />
      </div>
      <div className="commentAdd__input">
        <input
          id="inputComment"
          type="text"
          name="content"
          onChange={handleInputChange}
          placeholder={logged ?"Ajouter un commentaire" : "Connectez-vous pour ajouter un commentaire"}
        />
      </div>
      <div className="commentAdd__box-button">
        <button onClick={addComment}>Add</button>
      </div>
    </div>
  );
}
