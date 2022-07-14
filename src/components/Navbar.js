import React, { useState } from "react";
import logo from "../chat-logo.jpg";
import avatar from "../avatars/avatar-1.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

const Navbar = () => {
  const auth = useAuth();                                   //useAuth to manage profile of current user
  const [dropdown, setDropdown] = useState(false);          //hook to manage dropdown for user profile
  const navigate = useNavigate();

  // function for handling logout
  const handleLogout = () => {
    auth.logout();
    toast.success("Logged Out", {
      toastId: "#1234",
    });
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.navbar}>
      <div>
        <img src={logo} alt="Logo" width="250px" />
      </div>
      {auth.user ? (
        <div className={styles.avatar}>
          <img
            src={avatar}
            alt="Profile"
            width="66px"
            onMouseEnter={() => {
              setDropdown(true);
            }}
          />
        </div>
      ) : (
        ""
      )}

      {dropdown ? (
        <div className={styles.dropdowncontainer} onMouseLeave={()=>{setDropdown(false)}}>
          <div className={styles.dropdown}>
            <div>
              <button onClick={()=>{auth.setFriendRequest(true)}}>Friend Request</button>
            </div>
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      ) : ( 
        ""
      )}
    </div>
  );
};

export default Navbar;
