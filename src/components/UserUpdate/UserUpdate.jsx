import "./userUpdate.css"
import { useContext, useState } from "react";
import UserUpdateForm from "./UserUpdateForm.jsx";
import UserDeleteConfirm from "../UserDelete/UserDeleteConfirm.jsx";
import { UserContext } from "../../App.jsx";
import uploadFile from "../../utils/S3PutObject.js";


export default function UserUpdate({ rendered, userData, setRefresh, refresh }) {
  
  const baseApi = import.meta.env.BASE_API
  const { logout } = useContext(UserContext)
  const [DeleteConfirm, setDeleteConfirm] = useState(false)
  const [_, setForm] = useState({})
  
  const setFormData = (formData) => {
    setForm(formData)
  }
  
  const UpdateUser = async (formData) => {
    
    if (Object.entries(formData).length === 0) {
      return
    }
    
    if(formData.picture.length !== 0){
      const file = formData.picture
      formData.picture = await uploadFile(file)
    }
    
    fetch(baseApi + `/user/update`, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("token")} `,
      },
      body: JSON.stringify(formData),
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


