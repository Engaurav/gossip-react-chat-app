import React, { useEffect, useState } from 'react';
import style from '../styles/friend.module.css';
import avatar from "../avatars/avatar-1.jpg";
import { handleFechFriendDetail } from '../api';
import { useAuth } from '../hooks';


export default function Friend(props) {

  const [name,setName] = useState('Friend');
  const [ lastMessage , setLastMessage ] = useState('Hii');
  const [chat,setChat] = useState({});
  const auth = useAuth();

  const openChat = ()  => {
      console.log("Clicked",chat)
      auth.setShowChatBox(false);
      const fetchFriendDetail = async () => {
        const friend = props.friend;
        const response = await handleFechFriendDetail(friend.friend,friend.friend_id);
        auth.setChat(response);
      }
      fetchFriendDetail();
  }

  useEffect(()=>{
    const fetchFriendDetail = async () => {
      const friend = props.friend;
      const response = await handleFechFriendDetail(friend.friend,friend.friend_id);
      setChat(response);
      setLastMessage(response.data.friendship.lastMessage);
    }
    fetchFriendDetail();
  },[auth.lastMessage])


  useEffect(()=>{
    console.log("response Friend",chat)
  },[chat])



  useEffect (()=>{
    const fetchFriendDetail = async () => {
      const friend = props.friend;
      const response = await handleFechFriendDetail(friend.friend,friend.friend_id);
      setChat(response);
      setName(response.data.friends.name);
      setLastMessage(response.data.friendship.lastMessage);
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
            <div>{name}</div>
            <div style={{fontSize:12,marginLeft:5,color:'gray'}}>{lastMessage}</div>
        </div>

    </div>
    
  )
}
