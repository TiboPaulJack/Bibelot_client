import { useContext } from "react";
import { UserContext } from "../../App.jsx";
import baseHost from "../../assets/baseHost.js";


export default function UserDeleteConfirm({ setDeleteConfirm }) {
  
  const { userId } = useContext(UserContext)
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    fetch(baseHost + `/user/delete/${userId}`, {
      method: "DELETE",
      headers: {
        'authorization': `Bearer ${ localStorage.getItem( "token" ) } `,
      },
      }).then((res) =>
      {
        if (res.status === 200) {
          localStorage.removeItem("token")
          window.location = "/"
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
