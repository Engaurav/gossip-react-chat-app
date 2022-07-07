import styles from '../styles/chatContainer.module.css'
import Chatbox from "./Chatbox";
import Chats from "./Chats";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { useAuth } from "../hooks";


const ChatContainer = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    if(auth.user===null){
      toast.warning("Please Login First", {
        toastId: "#1234",
      });
      navigate("/login", { replace: true });
    }

    return (
      <div className={styles.ChatContainer}>
        <Chats />
        <Chatbox />
        <Profile />
      </div>
    );
  
}

export default ChatContainer;
