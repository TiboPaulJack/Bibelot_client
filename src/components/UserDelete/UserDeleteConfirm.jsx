import { useContext } from "react";
import { UserContext } from "../../App.jsx";
import s3DeleteObject from "../../utils/S3DeleteObject.js";


export default function UserDeleteConfirm({ setDeleteConfirm, userProducts }) {
  
  const baseApi = import.meta.env.VITE_BASE_API
  const { userId } = useContext(UserContext)
  
  const deleteUserDataInS3 = async () => {
    for (const product of userProducts) {
      try {
        await s3DeleteObject(product.picture);
        await s3DeleteObject(product.data);
      } catch (error) {
        console.error(error);
      }
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
        if (res.status === 200) {
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
