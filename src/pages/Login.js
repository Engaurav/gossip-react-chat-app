import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();


  if (auth.user) {
    toast.warning("Already Loggin In", {
      toastId: "#1234",
    });
    navigate("/", { replace: true });
  }
  
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
    <div>
      <div>
        <div>
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
                <input type="submit" value="Register" />
              ) : (
                <input type="submit" value="Logging In..." />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
