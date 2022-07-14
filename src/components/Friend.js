import React, { useEffect, useState } from 'react';
import style from '../styles/friend.module.css';
import avatar from "../avatars/avatar-1.jpg";
import { handleFechFriendDetail } from '../api';
import { useAuth } from '../hooks';


export default function Friend(props) {

  const [name,setName] = useState('');                      //hook to manage friend name
  const [ lastMessage , setLastMessage ] = useState('Fetching Chats');   //hook to manage last message for current frind
  const [chat,setChat] = useState({});                    //hook to manage chat of each friend
  const auth = useAuth();


  // function to manage clicked of this friend
  const openChat = ()  => {
      auth.setCurrentFriend(name)
      auth.setShowChatBox(false);
      const fetchFriendDetail = async () => {
        const friend = props.friend;
        const response = await handleFechFriendDetail(friend.friend,friend.friend_id);
        auth.setChat(response);
      }
      fetchFriendDetail();
  }


  // use effect to setup last message of current friend
  useEffect(()=>{
    const fetchFriendDetail = async () => {
      const friend = props.friend;
      const response = await handleFechFriendDetail(friend.friend,friend.friend_id);
      setChat(response);
      setLastMessage(response.data.friendship.lastMessage);
    }
    fetchFriendDetail();
  },[auth.lastMessage])


  // use effect to fetch friend detail from props and api when friend data first time load
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
    <>
    
    {/* Loader till friend detail not fetched  */}
    { name === '' ? <div style={{height:70}}><div className="loader"></div></div> : 
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
    </div> }
    </> 
    
  )
}
