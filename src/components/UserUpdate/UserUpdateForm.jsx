
export default function UserUpdateForm({ rendered, userData, setDeleteConfirm, setFormData, formData, ...props }) {
  
  const { setRendered } = props;
  const updateUser = props.UpdateUser
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    updateUser(formData)
      rendered("UserProducts");
    };
    
  
  
  
  
  
  return (
    <>
      <div className="userUpdate__title">Edit your Profile</div>
      <button
        className="userUpdate__close"
        onClick={() => rendered("UserProducts")}
      >
        X
      </button>
      <div className="userUpdate__form">
        <form className="userEditForm" onSubmit={handleSubmit}>
          <legend><label>Name</label></legend>
          <input type="text"
                 name="firstname"
                 placeholder={userData.firstname}
                 onChange={(e) => setFormData({...formData, firstname: e.target.value})}
          />
          <legend><label>Lastname</label></legend>
          <input type="text"
                 name="lastname"
                 placeholder={userData.lastname}
                 onChange={(e) => setFormData({...formData, lastname: e.target.value})}
          />
          
          <legend><label>Username</label></legend>
          <input type="text"
                 name="pseudo"
                 placeholder={userData.pseudo}
                 onChange={(e) => setFormData({...formData, pseudo: e.target.value})}
          />
          <legend><label>Email</label></legend>
          <input type="text"
                 name="email"
                 placeholder={userData.email }
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <legend><label>Avatar Picture</label></legend>
          <input type="file"
                 name="picture"
                 onChange={(e) => setFormData({...formData, picture: e.target.files[0]})}
          />
          {/*<label>Password</label>
          <input type="password"
                 name="password"
                 placeholder="Password"
          />
          <label>Password Confirm</label>
          <input type="password"
                 name="passwordConfirm"
                 placeholder="Password Confirm"
          />*/}
          <button className="userEditForm__button" type="submit">Update</button>
        </form>
      </div>
      <div className="userUpdate__delete">
        <button className="userUpdate__delete__button"
                onClick={() => setDeleteConfirm(true)}
        >
          Delete Profile
        </button>
      </div>
    </>
  );
}
