
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userRegister } from "../api";
import { useAuth } from "../hooks";
import styles from '../styles/auth.module.css'
import image from '../avatars/auth.jpg'
import { Link } from 'react-router-dom';




const Register = () =>  {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirm_password,setConfirmPassword] = useState('');
  const [signing,setSigning] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  if (auth.user) {
    toast.warning("Please Logout..!", {
      toastId: "#1234",
    });
    navigate("/", { replace: true });
  }


  const hanfleRegisterForm = async (e) => {
    setSigning(true);
    e.preventDefault()
    const body = {
      name,
      email,
      password,
      confirm_password 
    }
    const response = await userRegister(body);
    console.log(response)
    if (response.success) {
      navigate("/login", { replace: true });
      toast.success(response.message);
    } else {
      toast.error(response.message);
      setSigning(false);
    }

  }

    return (
      <div className={styles.authContainer}>
        <div className={styles.imageContainer}>
          <div>
            <img src={image} alt="authImage" />
          </div>
        </div>
        <div className={styles.formContainer}>
          <h2>Please Sign Up </h2>
          <form onSubmit={hanfleRegisterForm}>
              <div>
                  <label>Name</label>
                  <input type='text' name="name" placeholder="Enter Name..." value={name} onChange={(e)=>{return setName(e.target.value)}} required />
              </div>
              <div>
                  <label>Email</label>
                  <input type='email' name="email" placeholder="Enter Email..." value={email} onChange={(e)=>{return setEmail(e.target.value)}} required />
              </div>
              <div>
                  <label>Password</label>
                  <input type='password' name="password" placeholder="Enter Password..." value={password} onChange={(e)=>{return setPassword(e.target.value)}} required />
              </div>
              <div>
                  <label>Confirm Password</label>
                  <input type='password' name="confirm_password" placeholder="Enter Confirm Password..." value={confirm_password} onChange={(e)=>{return setConfirmPassword(e.target.value)}} required />
              </div>
              <div>
                  {signing ? (
                    <input type="submit" value="Registering" disabled />
                  ) : (
                    <button type="submit" >Register</button>
                  )}
              </div>
          </form>
          <div className={styles.Link}>
              <div> Already have acoount</div>
              <div> <Link to="/login">Login Here</Link></div>
          </div>
        </div>
      </div>
    )
}


export default Register;