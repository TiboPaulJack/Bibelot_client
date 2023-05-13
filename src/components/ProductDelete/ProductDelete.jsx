import { UserContext } from "../../App.jsx";
import { useContext } from "react";
import baseHost from "../../assets/baseHost.js";


export default function ProductDelete(props) {
  const { logout } = useContext(UserContext);
  
  const id = props.id;
  const rendered = props.rendered;
  const { setRefresh } = props;
  

  const productDelete = (id) => {
    
    
    fetch(baseHost + `/model/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")} `,
      },
    }).then((res) => {
      setRefresh(true);
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        logout();
        window.location = "/";
      }
    });
    rendered("UserProducts");
  };

  return (
    <div className="productDeleteConfirm">
      
      <button
        className="deleteModelConfirm__close"
        onClick={() => rendered("UserProducts")}
      >
        X
      </button>
      <h6 className="productDeleteConfirm__title">
        This action is irreversible, by clicking on confirm, this model will be
        deleted
      </h6>
      <button className="productDeleteConfirm__close" onClick={() => productDelete(id)}>
        DELETE MODEL
      </button>
    </div>
  );
}


