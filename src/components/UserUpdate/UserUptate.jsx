import "./userUpdate.css"
import { useContext, useState } from "react";
import UserUpdateForm from "./UserUpdateForm.jsx";
import UserDeleteConfirm from "../UserDelete/UserDeleteConfirm.jsx";
import { UserContext } from "../../App.jsx";
import baseHost from "../../assets/baseHost.js";


export default function UserUpdate({ rendered, userData, setRefresh, refresh }) {
  
  const { logout } = useContext(UserContext)
  const [DeleteConfirm, setDeleteConfirm] = useState(false)
  const [_, setForm] = useState({})
  
  const setFormData = (formData) => {
    setForm(formData)
  }
  
  const UpdateUser = (formData) => {
    
    if (Object.entries(formData).length === 0) {
      return
    }
    
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    
    fetch(baseHost + `/user/update`, {
      method: "PATCH",
      body: form,
      headers: {
        'authorization': `Bearer ${localStorage.getItem("token")} `,
      },
    }).then((res) => {
      setRefresh(true)
      if (res.status === 401 ) {
        logout()
      }
      else if(res.status !== 200){
        console.error(res.status, res.message)
      }
    } )
  }
  
  
  return (
    <div className="userUpdate">
      {
          DeleteConfirm
          ?
          <UserDeleteConfirm setDeleteConfirm={setDeleteConfirm} />
          :
          <UserUpdateForm rendered={rendered}
                          setDeleteConfirm={setDeleteConfirm}
                          userData={userData}
                          setFormData={setFormData}
                          formData={_}
                          UpdateUser={UpdateUser}
          />
      }
      
   
    </div>
  );
}


