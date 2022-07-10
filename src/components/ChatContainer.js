import styles from '../styles/chatContainer.module.css';
import Chats from "./Chats";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import FriendRequest from './FriendRequest';


const ChatContainer = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    if(!auth.user){
      navigate("/login", { replace: true });
    }

    return (
      <div className={styles.ChatContainer}>
        <Chats />
        <FriendRequest/>
      </div>
    );
  
}

export default ChatContainer;
