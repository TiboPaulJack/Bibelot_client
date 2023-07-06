import "./header.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App.jsx";

export default function Header({rendered, setSmallScreenRegister}) {

    const navigate = useNavigate();
    const { logged } = useContext(UserContext);
    const { logout } = useContext(UserContext);
    const { setSideBar } = useContext(UserContext);

    const handleProfile = () => {
        if(rendered){
            rendered("UserProducts");
        }
        navigate("/user");
    }

    const handleLogout = () => {
        logout();
    }

    const handleLogin = () => {
        navigate("/auth")
        setSmallScreenRegister(false);
    }

    return (
      <header className="header">

          <h1 className="header__title" onClick={() => navigate("/")}>
              Bibelot
          </h1>

          <button className="sidebar__btn" onClick={() => setSideBar()}>
              <svg width="34px" height="34px" strokeWidth="2.4" viewBox="0 0 24 24" fill="none" color="#000000"><path d="M3 5h18M3 12h18M3 19h18" stroke="#000000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </button>

          <nav className="header__nav">

              <button className="nav__button-models" onClick={() => navigate("/models")}>
                  Models
              </button>

              {logged &&
                <>
                    <button className="nav__button" onClick={handleProfile}>
                        Profile
                    </button>
                    <button className="auth__button-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </>
              }

              {!logged &&
                <button className="auth__button-login" onClick={handleLogin}>
                    Login
                </button>
              }
          </nav>
      </header>
    );
}
