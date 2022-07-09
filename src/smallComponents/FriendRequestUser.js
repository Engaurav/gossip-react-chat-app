import React, { useState } from "react";
import { handleFriendDeleteRequest, handleFriendRequestAccept } from "../api";
import avatar from "../avatars/avatar-1.jpg";
import style from '../styles/friendrequest.module.css'



export default function FriendRequestUser(props) {
  
  const user = props.requests.sender;
  const [action,setAction] = useState(true); 
  const [message,setMessage] = useState('');
  const acceptFriendRequest = async () =>{
    const response = await handleFriendRequestAccept(props.requests._id);
    if(response.success){
        setAction(false);
        setMessage("Request Accepted")
    }
  }
  const deleteFriendRequest = async () =>{
    const response = await handleFriendDeleteRequest(props.requests._id);
    if(response.success){
        setAction(false);
        setMessage("Request Deleted")
    }
  }

  return (
    <div className={style.friendRequestBox}>
      <div className={style.friendRequestBoxImage}>
        <img src={avatar} alt="userImage" />
      </div>

      <div className={style.friendRequestBoxDetail}>
        <div className={style.friendRequestBoxName}>{user.name}</div>
        <div className={style.friendRequestBoxRequest}>
          { action ? 
          <>
            <div className={style.friendRequestBoxAccept}>
                <button onClick={acceptFriendRequest}>Confirm</button>
            </div>
            <div className={style.friendRequestBoxReject}>
                <button onClick={deleteFriendRequest}>Delete</button>
            </div>
          </> :
           <div>{message}</div>}

        </div>
      </div>
    </div>
  );
}
