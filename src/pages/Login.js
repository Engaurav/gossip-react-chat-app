import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import styles from '../styles/auth.module.css'
import image from '../avatars/auth.jpg'
import { Link } from 'react-router-dom';

const Login = () => {

  // hooks for this page
  const [email, setEmail] = useState("");       
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(true);
  const auth = useAuth();     //auth custom hook
  const navigate = useNavigate();


  if (auth.user) {
    toast.warning("Already Loggin In", {
      toastId: "#1234",
    });
    navigate("/", { replace: true });
  }
  

  // handle login form
  const handleLoginForm = async (e) => {
    e.preventDefault();
    setLoggingIn(false);
    if (!email || !password) {
      toast.error(" Email or Password Not Filled..!! ");
    }
    const response = await auth.login(email, password);
    if (response.success) {
      navigate("/", { replace: true });
      toast.success("Loggin Successful");
    } else {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className={styles.authContainer}>

      {/* poster coontainer */}
      <div className={styles.imageContainer}>
        <div>
          <img src={image} alt="authImage" />
        </div>
      </div>

      {/* login form container */}
      <div className={styles.formContainer}>
        <h2>Please Login </h2>
        <form onSubmit={handleLoginForm}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            {loggingIn ? (
              <button type="submit" >Login</button>
            ) : (
              <input type="submit" value="Logging In..." disabled />
            )}
          </div>
        </form>
        <div className={styles.Link}>
              <div>Create a New User</div>
              <div><Link to="/register">Register Here</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
