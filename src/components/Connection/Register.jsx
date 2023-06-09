import { createPortal } from "react-dom";
import Modal from "../Modal/Modal.jsx";
import { UserContext } from "../../App.jsx";
import { useContext, useState } from "react";

export default function Register(props) {

    const { smallScreenRegister, setSmallScreenRegister } = props
    const { showModal, setShowModal } = useContext(UserContext);
    const {setModalContent } = useContext(UserContext);
    const baseApi = import.meta.env.VITE_BASE_API
    const [errMessage, setErrMessage] = useState("")
    const [errInput, setErrInput] = useState("")
  

  const register = async (data, pseudo) => {

    try {
      const response = await fetch(baseApi + "/user/add", {
        method: "POST",
        body: data
      });
      if(response.ok) {
        setModalContent(`You have been registered successfully !
        Welcome to the community ${pseudo}  !`);
        setShowModal(true);
      }
      return response.json()
      .then((data) => {
        if(typeof data === "string") {
          if(data.includes("pseudo")) {
            setErrInput("pseudo")
          }
          if(data.includes("email")) {
            setErrInput("email")
          }
          setErrMessage(data)
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const pseudo = formData.get("pseudo");

    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    if (password !== passwordConfirm) {
      setErrInput("password")
      setErrMessage("Passwords are not the same");
      return;
    }
    // Delete passwordConfirm from the form data
    formData.delete("passwordConfirm");

    // Send the data to the API
    register(formData, pseudo)
    
    form.reset();
    
  };
  
  const handleSpanAccount = () => {
    setSmallScreenRegister(false)
  }

  return (
    
    <div className={smallScreenRegister ? "register visible" : "register"}>
      
      {showModal && createPortal(
        <Modal/>,
        document.body
      )}
      <div className="errMessage">
        {errMessage}
      </div>
      <div className="register__form">
        
        <form onSubmit={handleSubmit}>
          <div className="register__form__input">
            <legend><label htmlFor="firstname">First Name</label></legend>
            <input type="text"
                   name="firstname"
            />
          </div>
          <legend><label htmlFor="lastname">Last Name</label></legend>
          <div className="register__form__input">
            <input type="text"
                   name="lastname"
            />
          </div>
          <legend><label htmlFor="pseudo">Username</label></legend>
          <div className="register__form__input">
            <input
              className=
                {
                  errInput === "pseudo"
                    &&
                    "inputError"
                }
              type="text"
              name="pseudo"
            />
          </div>
          <legend><label htmlFor="email">Email</label></legend>
          <div className="register__form__input">
            <input
              className=
                {
                  errInput === "email"
                  &&
                  "inputError"
                }
              type="text"
              name="email"
            />
          </div>
          <legend><label htmlFor="password">Password</label></legend>
          <div className="register__form__input">
            <input
              className=
                {
                  errInput === "password"
                  &&
                  "inputError"
                }
              type="password"
              name="password"
            />
          
          </div>
          <legend><label htmlFor="passwordConfirm">Confirm Password</label></legend>
          <div className="register__form__input">
            <input
              className=
                {
                  errInput === "password"
                  &&
                  "inputError"
                }
              type="password"
              name="passwordConfirm"
            />
          </div>
          <div className="register__form__button">
            <button type="submit">Register</button>
            <span className={"spanAccount"} onClick={handleSpanAccount}>
              Already have an account ?
            </span>
          </div>
        </form>
      </div>
      
    </div>
  );
}
