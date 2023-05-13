import './auth.css'
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import {useState} from "react";



export default function Auth() {

    const [smallScreenRegister, setSmallScreenRegister] = useState(false);

  return (
    <>
      <Header setSmallScreenRegister={setSmallScreenRegister} />
      <div className="auth">
        <Register
            smallScreenRegister={smallScreenRegister}
            setSmallScreenRegister={setSmallScreenRegister}
        />
        <Login
            smallScreenRegister={smallScreenRegister}
            setSmallScreenRegister={setSmallScreenRegister}
        />
      </div>
    </>
  )
}
