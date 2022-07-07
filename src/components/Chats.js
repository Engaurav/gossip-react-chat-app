import styles from "../styles/chats.module.css";
import avatar from "../avatars/avatar-1.jpg";
import { useState } from "react";
import Profile from "./Profile"
import FriendList from "./FriendList";


const Chats = () => {
    const [showProfile,setShowProfile] = useState(false);
    const [showChats,setShowChats] = useState(true);

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

    return <div className={styles.Chats}>
      
        {/* Chat Section */}
        { showChats ? 
          <>
            <div className={styles.profile_container}>
              <div className={styles.profile_div}>
                <button><img src={avatar} alt="Profile" width="40px" onClick={handleProfile}></img></button>
              </div>
              <div className={styles.addFriend}>
                <button><img src="https://cdn-icons-png.flaticon.com/512/2583/2583145.png" alt="Add Friend" width="25px"></img></button>
              </div>
            </div> 
            <FriendList/>
          </>
        : "" }

        { showProfile ? <Profile handleProfileClose = {handleProfile}/> : "" }


    </div>;
  }


export default Chats;
