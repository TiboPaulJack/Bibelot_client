import "./userPage.css";
import Header from "../Header/Header.jsx";
import UserBanner from "./UserBanner.jsx";
import UserProducts from "./UserProducts.jsx";
import { useContext, useEffect, useState } from "react";
import UserUpdate from "../UserUpdate/UserUpdate.jsx";
import ProductAdd from "../ProductAdd/ProductAdd.jsx";
import ProductUpdate from "../ProductUpdate/ProductUpdate.jsx";
import { UserContext } from "../../App.jsx";
import ProductDelete from "../ProductDelete/ProductDelete.jsx";
import Loader from "../Loader/Loader.jsx";

export default function UserPage() {

  const { logout } = useContext(UserContext);
  const baseApi = import.meta.env.VITE_BASE_API

  const [userData, setUserData] = useState({});
  const [userProducts, setUserProducts] = useState([]);
  const [rendered, setRendered] = useState("UserProducts");
  const [selectedId, setSelectedId] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetch(baseApi + `/user/info`, {
      method: "GET",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401 || res.status === 403 || res.status === 404) {
        logout()
        window.location = "/";
      }
    }).then((data) => {
      setUserData(data.user);
      setUserProducts(data.model);
      console.log(userProducts,' userProducts')
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
        <UserBanner
            rendered={handleRendered}
            userData={userData}
        />
        <div className="userPage__main">
          {
            rendered === "UserProducts" && (
              <UserProducts
                rendered={handleRendered}
                setRendered={setRendered}
                userProducts={userProducts}
                setUserProducts={setUserProducts}
                setSelectedId={handleSelectedId}
              />
            )
          }

          {rendered === "UserUpdate" && (
            <UserUpdate
              rendered={handleRendered}
              userData={userData}
              userProducts={userProducts}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          )}

          {
            rendered === "ProductAdd" && (
              isLoading ? <Loader /> :
            <ProductAdd
              rendered={handleRendered}
              setRefresh={setRefresh}
              refresh={refresh}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {rendered === "ProductUpdate" && (
            <ProductUpdate
              rendered={handleRendered}
              id={selectedId}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          )}
          {rendered === "ProductDelete" && (
            <ProductDelete
              rendered={handleRendered}
              id={selectedId}
              setRefresh={setRefresh}
              refresh={refresh}
              data={userProducts}
            />
          )}

        </div>
      </div>
    </>
  );

}
