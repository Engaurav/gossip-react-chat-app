import styles from '../styles/chatContainer.module.css'
import Chatbox from "./Chatbox";
import Chats from "./Chats";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";


const ChatContainer = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    console.log(auth);
    if(!auth.user){
      navigate("/login", { replace: true });
    }

    return (
      <div className={styles.ChatContainer}>
        <Chats />
        <Chatbox />
      </div>
    );
  
}

export default ChatContainer;
