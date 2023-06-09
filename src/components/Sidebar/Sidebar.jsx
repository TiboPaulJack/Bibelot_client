import './sidebar.css'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App.jsx";


export default function Sidebar() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const { setSideBar } = useContext(UserContext);
  const { sideBarActive } = useContext(UserContext);
  const { logged } = useContext(UserContext);


  const handleClickProfile = () => {
    setSideBar();
    navigate("/user");
  }

  const handleClickModels = () => {
    setSideBar();
    navigate("/models");
  }
  
  const handleClickLogin = () => {
    setSideBar();
    navigate("/auth");
  }
  
  const handleClickLogout = () => {
    setSideBar();
    logout();
    navigate("/");
  }

  return (
    <div className={sideBarActive ? "sidebar active" : "sidebar"}>

      <ul className="sidebar__list">
        {logged && <li className="sidebar__list-item" onClick={ handleClickProfile }>
          Profile
        </li> }
        <li className="sidebar__list-item" onClick={handleClickModels}>
          Models
        </li>
        {!logged ? <li className="sidebar__list-item" onClick={ handleClickLogin }>
          Login
        </li> :
          <li className="sidebar__list-item" onClick={ handleClickLogout }>
        Logout
        </li>
        }
        <li className="sidebar__list-item">Help</li>
        <li className="sidebar__list-item">About</li>
        <li className="sidebar__list-item">Privacy Policy</li>
        <li className="sidebar__list-item">Contact</li>
      </ul>
    </div>
  );
}
