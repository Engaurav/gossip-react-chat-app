
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userRegister } from "../api";


const Register = () =>  {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirm_password,setConfirmPassword] = useState('');
  const [signing,setSigning] = useState(false);
  const navigate = useNavigate();


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
      <div>
        <div>
            <div>
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
                        <input type='submit' value="Register" disabled={signing}/>
                    </div>
                </form>
            </div>
        </div>
      </div>
    )
}


export default Register;