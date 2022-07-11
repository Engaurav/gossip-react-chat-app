import React, { useEffect, useState } from 'react';
import style from '../styles/friend.module.css';
import avatar from "../avatars/avatar-1.jpg";
import { handleFechFriendDetail } from '../api';
import { useAuth } from '../hooks';


export default function Friend(props) {

  const [name,setName] = useState('Friend');
  // const [lastMessage,setLastMessage] = useState('No Message');
  const [chat,setChat] = useState({});
  const auth = useAuth();

  const openChat = ()  => {
    // console.log("Open Chat",chat)
    auth.setChat(chat);
  }

  useEffect (()=>{
    const fetchFriendDetail = async () => {
      const friend = props.friend;
      const response = await handleFechFriendDetail(friend.friend,friend.friend_id);
      // console.log(response);
      setChat(response);
      setName(response.data.friends.name);
    }
    fetchFriendDetail();
  },[props.friend])
  
  return (
    <div className={style.friendContainer}>
        <div className={style.friendImageContainer}>
            <div className={style.friendImage}>
                <img src={avatar} alt='FriendImage'/>
            </div>
        </div>
        <div className={style.friendName} onClick={openChat}>
            {name}
        </div>
    </div>
    
  )
}
