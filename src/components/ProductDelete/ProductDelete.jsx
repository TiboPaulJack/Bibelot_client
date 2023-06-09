import { UserContext } from "../../App.jsx";
import { useContext } from "react";
import deleteFile from "../../utils/S3DeleteObject.js";


export default function ProductDelete(props) {

  const { logout } = useContext(UserContext);
  const baseApi = import.meta.env.VITE_BASE_API
  const id = props.id;
  const rendered = props.rendered;
  const { setRefresh } = props;
  const data = props.data;

  const deleteFromS3 = async (id) => {
    const obj = data.find(element => element.id === id)
    await deleteFile(obj.data)
    await deleteFile(obj.picture)
  }

  // TODO : VERIFIER POURQUOI LA PHOTO NE SE SUPPRIME PAS DE S3
  //  IMAGE EST DEJA EN BLOB
  const productDelete = (id) => {

    fetch(baseApi + `/model/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")} `,
      },
    }).then((res) => {
      setRefresh(true);
      if (res.status === 204) {
        return deleteFromS3( id )
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


