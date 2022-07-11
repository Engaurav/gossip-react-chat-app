import styles from "../styles/chats.module.css";
import avatar from "../avatars/avatar-1.jpg";
import { useEffect, useState } from "react";
import Profile from "./Profile"
import FriendList from "./FriendList";
import Chatbox from './Chatbox';
import SearchFriends from "./SearchFriends";
import { useAuth } from "../hooks";


const Chats = () => {

    const [showProfile,setShowProfile] = useState(false);
    const [showSearch,setShowSearch] = useState(false);
    const [showChats,setShowChats] = useState(true);
    const [showChatBox,setShowChatBox] = useState(true);
    // const [friend,setFriend] = useState('AKS');
    const auth = useAuth();

    useEffect(()=>{
      setShowChatBox(false);
      // console.log("USe",auth.chat)
      setShowChatBox(true);
    },[auth.chat])

  

    // handle proofile function
    const handleProfile = () => {
      if(showProfile){
        setShowProfile(false);
        setShowChats(true);
      }else{
        setShowChats(false);
        setShowProfile(true);
      }
    }
    const handleSearch = () => {
      if(showSearch){
        setShowChats(true);
        setShowSearch(false);
      }else{
        setShowChats(false);
        setShowSearch(true);
      }
    }

    return (
      <>
      <div className={styles.Chats}>
      
        {/* Chat Section */}
        { showChats ? 
          <>
            <div className={styles.profile_container}>
              <div className={styles.profile_div}>
                <button onClick={handleProfile}><img src={avatar} alt="Profile" width="40px" ></img></button>
              </div>
              <div className={styles.addFriend}>
                <button onClick={handleSearch}><img src="https://cdn-icons-png.flaticon.com/512/2583/2583145.png" alt="Add Friend" width="25px"></img></button>
              </div>
            </div> 
            <FriendList/>
          </>
        : "" }

        { showProfile ? <Profile handleProfileClose = {handleProfile}/> : "" }
        { showSearch ? <SearchFriends handleSearchClose = {handleSearch}/> : ""}  
     </div>
     { showChatBox ? <Chatbox friend={auth.chat}  /> : "" }
    </>
    )
  }


export default Chats;
