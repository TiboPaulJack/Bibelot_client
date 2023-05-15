import { useEffect, useState } from "react";
import S3GetObject from "../../utils/S3GetObject.js";


export default function UserBanner({ rendered, userData }) {
  
  const [url, setUrl] = useState("")
  
  const getUrlFromS3 = async (key) => {
    return await S3GetObject( key )
  }
  
  useEffect(() => {
      getUrlFromS3(userData.picture)
        .then((url) => {
          setUrl(url)
        })
      
  }, [userData]);
  
  return (
    <div className="userBanner">
      <div className="userBanner__avatar">
        <img src={url} alt="" />
      </div>
      <div className="userBanner__name">
        <h3>WELCOME {userData.pseudo}</h3>
      </div>
      <button className="editProfile" onClick={() => rendered("UserUpdate")}>
        edit
      </button>
    </div>
  );
}
