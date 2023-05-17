import { useContext } from "react";
import { UserContext } from "../../App.jsx";
import s3DeleteObject from "../../utils/S3DeleteObject.js";


export default function UserDeleteConfirm({ setDeleteConfirm, userProducts, userData }) {

  const baseApi = import.meta.env.VITE_BASE_API
  const userId = userData.id
  console.log(userId)
  

  const deleteUserDataInS3 = async () => {
    for (const product of userProducts) {
      try {
        await s3DeleteObject(product.picture);
        await s3DeleteObject(product.data);
      } catch (error) {
        console.error(error);
      }
      if(userData.picture !== "defaultAvatar.png")
      await s3DeleteObject(userData.picture)
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(baseApi + `/user/delete/${userId}`, {
      method: "DELETE",
      headers: {
        'authorization': `Bearer ${ localStorage.getItem( "token" ) } `,
      },
      }).then((res) =>
      {
        // TODO: PROBLEME DE STATUT
        if (res.status === 203) {
          deleteUserDataInS3().then( () => {
            localStorage.removeItem( "token" )
            window.location = "/"
          })
        }
      })

  }



  return (
    <div className="userDeleteConfirm">

      <div className="userDeleteConfirm__title">Delete your Profile</div>
      <button className="userDeleteConfirm__close" onClick={() => setDeleteConfirm(false)}>
        X
      </button>
      <div className="userDeleteConfirm__form">
        <form className="userDeleteConfirmForm">
          <label>Username</label>
          <input type="text"
                 placeholder="Pseudo"
          />
          <label>Password</label>
          <input type="password"
                 placeholder="Password"
          />
          <button className="userDeleteConfirmForm__button"
                  onClick={handleSubmit}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
