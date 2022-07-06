import React, { useState } from "react";
import logo from "../chat-logo.jpg";
import avatar from "../avatars/avatar-1.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks";

const Navbar = () => {
  const auth = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();


  const handleLogout = () => {
    auth.logout();
    toast.success("Logged Out", {
      toastId: '#1234',
    });
    navigate('/login',{ replace: true })

  }

  return (
    <div className={styles.navbar}   onMouseLeave={() => {
      setDropdown(false);
    }}>
      <div>
        <img src={logo} alt="Logo" width="250px" />
      </div>
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
      {dropdown ? 
          <div
            className={styles.dropdown}
            onMouseOut={() => {
              setDropdown(false);
            }}
          >
            <button onClick={handleLogout}>Logout</button>
          </div>
       : ""
      }
    </div>
  );
};

export default Navbar;
