import {useContext, useState} from "react";
import { UserContext } from "../../App.jsx";
import { useNavigate } from "react-router-dom";


export default function Login(props) {
  
  const { logged, setLogged } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const { userId, setUserId } = useContext(UserContext);
  const { logout } = useContext(UserContext);
  const baseApi = import.meta.env.VITE_BASE_API

  const navigate = useNavigate();
  const { smallScreenRegister, setSmallScreenRegister } = props
  

  const login = async (formData) => {
    
    console.log(baseApi)
    
    const form = new URLSearchParams(formData);
    try {
      const response = await fetch(baseApi + "/user/signin", {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      if (response.status === 200) {
        setLogged(true);
        setUserId(data.userId);
        setUser(data.pseudo);
        localStorage.setItem("token", data.token);
        navigate("/user")
        setInterval(() => {
          logout()
        } , 60 * 60 * 1000) // 1 hour
      }
    } catch (error) {
      console.log("error :", error.status, error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    return login(formData);
  };

  const handleSpanAccount = () => {
    setSmallScreenRegister(!smallScreenRegister);
  }

  return (
    <div className={smallScreenRegister ? "login hidden" : "login"}>
      <div className="login__form">
        <form onSubmit={handleSubmit}>
          <div className="login__form__input">
            <legend>
              <label htmlFor="email">Email</label>
            </legend>
            <input type="text" name="email" />
          </div>
          <div className="login__form__input">
            <legend>
              <label htmlFor="password">Password</label>
            </legend>
            <input type="password" name="password" />
          </div>
          <div className="login__form__button">
            <button type="submit">Login</button>

            <span className={"spanAccount"} onClick={handleSpanAccount}>
              Don't have an account ?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
