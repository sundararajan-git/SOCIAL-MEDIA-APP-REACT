import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useAuthentication } from "../../hook/useAuthentication";
import { AuthContext } from "../../context/AuthContext";
import { useThemeContext } from "../../hook/useThemeContext";

const Profile = () => {
  const [db, setDb] = useState([
    "https://i.pinimg.com/originals/66/03/58/660358db389c0e793bd234d928b909c4.jpg",
    "https://imagesvibe.com/wp-content/uploads/2022/12/Cartoon-Images-For-Boys30-1.jpg",
    "https://play-lh.googleusercontent.com/O-XCKa3OyhdbPCSvk-pXLtnTjQkqggv83do7FkMak2KYa7udsBx4RV-YRQsUof_s9Evm",
  ]);
  const [num, setnum] = useState(null);
  const navigate = useNavigate();
  const state = useContext(AuthContext);
  const { logout } = useAuthentication();
  const { theme } = useThemeContext();
  useEffect(() => {
    setnum(Math.floor(Math.random() * db.length));
  }, []);
  const logoutHandle = () => {
    navigate("/login");
    if (state.user) {
      logout();
    }
  };
  return (
    <div className={`profile  ${theme}profile`}>
      <div>
        <img src={db[num]} title="db" />
        <p>{state.user.email.split("@")[0]}</p>
        <button className="btn" type="button" onClick={logoutHandle}>
          {state.user ? "Log Out" : "Log in"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
