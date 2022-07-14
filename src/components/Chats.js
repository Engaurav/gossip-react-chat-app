import styles from "../styles/chats.module.css";
import avatar from "../avatars/avatar-1.jpg";
import { useEffect, useState } from "react";
import Profile from "./Profile"
import FriendList from "./FriendList";
import Chatbox from './Chatbox';
import SearchFriends from "./SearchFriends";
import { useAuth } from "../hooks";


const Chats = () => {

    const [showProfile,setShowProfile] = useState(false);     //hook to manage view profile 
    const [showSearch,setShowSearch] = useState(false);       //hook to manage view search 
    const [showChats,setShowChats] = useState(true);          //hook to manage Chats of a new freind 
    const [friend,setFriend] = useState({});                  //hooks for sending friends data such as name and chats of friend
    const auth = useAuth();


    // useEffect to setup new chats for current friend clicked
    useEffect(()=>{
      setFriend(auth.chat);
      auth.setShowChatBox(true);
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

    // handle search section
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
                <button onClick={handleProfile}><img src={avatar} alt="Profile" width="55px" ></img></button>
              </div>
              
              <div className={styles.addFriend}>
                <button onClick={handleSearch}><img src="https://cdn-icons-png.flaticon.com/512/2583/2583145.png" alt="Add Friend" width="25px"></img></button>
              </div>
            </div> 
            <FriendList/>
          </>
        : "" }

        {/* handle show Proile components  */}
        { showProfile ? <Profile handleProfileClose = {handleProfile}/> : "" }

        {/* handle show Search Friends components  */}
        { showSearch ? <SearchFriends handleSearchClose = {handleSearch}/> : ""}  

     </div>

     {/* Chatbox according to friend clicked */}
     { auth.showChatBox ? <Chatbox friend={friend}  /> : <Chatbox friend={{}}/> }
    </>
    )
  }


export default Chats;
