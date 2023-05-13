import "./userPage.css";
import Header from "../Header/Header.jsx";
import UserBanner from "./UserBanner.jsx";
import UserProducts from "./UserProducts.jsx";
import { useContext, useEffect, useState } from "react";
import UserUpdate from "../UserUpdate/UserUptate.jsx";
import ProductAdd from "../ProductAdd/ProductAdd.jsx";
import ProductUpdate from "../ProductUpdate/ProductUpdate.jsx";
import { UserContext } from "../../App.jsx";
import bufferToUrl from "../../utils/BufferToUrl.js";
import ProductDelete from "../ProductDelete/ProductDelete.jsx";
import baseHost from "../../assets/baseHost.js";

export default function UserPage() {
  
  const { logout } = useContext(UserContext);
  
  const [userData, setUserData] = useState({});
  const [userProducts, setUserProducts] = useState([]);
  const [rendered, setRendered] = useState("UserProducts");
  const [selectedId, setSelectedId] = useState(0);
  const [refresh, setRefresh] = useState(false);
  
  
  useEffect(() => {
    fetch(baseHost + `/user/info`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")} `,
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401 || res.status === 403 || res.status === 404) {
        logout()
        window.location = "/";
      }
    }).then((data) => {
      data.userProfil.picture = bufferToUrl(data.userProfil.picture.data)
      setUserData(data.userProfil);
      setUserProducts(data.allModel);
      setRefresh(false)
    }).catch((error) => {
      console.error(error);
    });
  }, [setRefresh, refresh]);
  
  
  
  const handleSelectedId = (id) => {
    setSelectedId(id);
  }
  const handleRendered = (componentName) => {
    setRendered(componentName);
  }
  
  
  
  return (
    <>
      <Header rendered={handleRendered} />
      <div className="userPage">
        <UserBanner rendered={handleRendered}
                    userData={userData}
        />
        <div className="userPage__main">
          {rendered === "UserProducts"
            &&
            <UserProducts rendered={handleRendered}
                          setRendered={setRendered}
                          userProducts={userProducts}
                          setUserProducts={setUserProducts}
                          setSelectedId={handleSelectedId}
            />}
          {rendered === "UserUpdate"
            &&
            <UserUpdate rendered={handleRendered}
                        userData={userData}
                        setRefresh={setRefresh}
                        refresh={refresh}
            />}
          {rendered === "ProductAdd"
            &&
            <ProductAdd rendered={handleRendered}
                        setRefresh={setRefresh}
                        refresh={refresh}
            />}
          {rendered === "ProductUpdate"
            &&
            <ProductUpdate rendered={handleRendered}
                           id={selectedId}
                           setRefresh={setRefresh}
                           refresh={refresh}
                           
            />
          }
          {rendered === "ProductDelete"
            &&
            <ProductDelete  rendered={handleRendered}
                            id={selectedId}
                            setRefresh={setRefresh}
                            refresh={refresh}
            />}
          
        </div>
      </div>
      
    </>
  );
}
