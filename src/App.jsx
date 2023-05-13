import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import './App.css';
import HomePage from "./components/HomePage/HomePage.jsx";
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import Auth from "./components/Connection/Auth.jsx";
import UserPage from "./components/UserPage/UserPage.jsx";
import { tokenCheck } from "./utils/TokenCheck.js";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
const root = document.getElementById('root');




export const UserContext = createContext({
  user: '',
  userId: 0,
  logged: false,
  sideBarActive: false,
  setSideBar: () => {},
  setLogged: () => {},
  setPseudo: () => {},
  setUserId: () => {},
  logout: () => {},
  userCheck: () => {},
  showModal: false,
  setShowModal: () => {},
  modalContent: '',
  setModalContent: () => {}
  
  
});

function App() {
  
  
  
  root.style.overflow = 'hidden';
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState(0);
  const [logged, setLogged] = useState(false);
  const [sideBarActive, setSideBarActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  
  if(showModal){
    document.body.style.overflow = "hidden";
    root.style.filter = "blur(2px)";
    root.style.opacity = "0.7";
    root.style.pointerEvents = "none";
  }
  
  const userCheck = () => {
    tokenCheck().then(res => {
      setUserId(res.user.id)
      setUser(res.user.pseudo)
    });
  }
  
  const setSideBar = () => {
    setSideBarActive(!sideBarActive);
  }
  
  useEffect(() => {
    userCheck()
  }, [logged]);
  
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogged(true);
    }else{
      setLogged(false);
    }
  }, []);
  
  
 
  
  const logout = () => {
    setLogged(false);
    setUser('');
    setUserId(null);
    localStorage.removeItem('token');
    window.location = "/";
  }
  
  return (
    <div className="App">
      <UserContext.Provider value={{
        user: user,
        setUser: setUser,
        logged: logged,
        setLogged: setLogged,
        userId: userId,
        setUserId: setUserId,
        logout: logout,
        setSideBar: setSideBar,
        sideBarActive: sideBarActive,
        showModal: showModal,
        setShowModal: setShowModal,
        userCheck: userCheck,
        modalContent: modalContent,
        setModalContent: setModalContent
      }}>
        <Sidebar />
        <Routes>
          <Route path="/model/:id" element={<ProductDetails />} />
          <Route path="/models" element={<ProductPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}




export default App


