import React, { useEffect, useState } from 'react';
import style from '../styles/searchlist.module.css';
import avatar from "../avatars/avatar-1.jpg";
import { useAuth } from '../hooks';
import { handleFriendDeleteRequest, handleFriendSendRequest, handleFriendShowRequest } from '../api';


export default function SearchList(props) {
  const auth = useAuth();
  const [frienship , setFrienship] = useState(false);
  const [ id, setId ] = useState('');

 

  useEffect(()=>{
    const fetchFriendship = async ()=>{
      const body = {
        sender : auth.user.id,
        reciever : props.user._id
      }
      const response = await handleFriendShowRequest(body);
      if(response.success){
        setFrienship(true);
        setId(response.data.friendships)
      }
    }
    fetchFriendship();
    
  },[frienship,auth.user.id,props.user._id])

  const handleSendRequest = async () => {
    const body = await {
      sender : auth.user.id,
      reciever : props.user._id
    }
    const response = await handleFriendSendRequest(body);
    if(response.success){
      setFrienship(true);
      setId(response.data.friendships)
    }
  }

  const deletingRequest = async () => {
    console.log("id",id)
    const response = await handleFriendDeleteRequest(id);
    if(response.success){
      setFrienship(false);
      setId('');
    }
  }

  return (
    <div className={style.searchContainer}>
        <div className={style.userImageContainer}>
            <div className={style.userImage}>
                <img src={avatar} alt='userImage'/>
            </div>
        </div>
        <div className={style.userDetail}>
            <div>{ props.user.name}</div>
            <div className={style.userEmail}> {props.user.email} </div>
        </div>
        <div className={style.userFreindship}>
            { frienship ?  
            <button 
                className={style.removeFriend} 
                onClick={deletingRequest}>
                Unfriend
            </button>
            :
            <button className={style.addFriend} onClick={handleSendRequest}>Add Friend</button>
            }
        </div>

    </div>
  )
}
