
export default function UserBanner({ rendered, userData }) {
  
  
  return (
    <div className="userBanner">
      <div className="userBanner__avatar">
        <img src={userData.picture} alt="" />
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
