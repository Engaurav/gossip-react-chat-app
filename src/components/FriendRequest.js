import React, { useEffect, useState } from 'react'
import style from '../styles/friendrequest.module.css'
import { useAuth } from "../hooks";
import FriendRequestUser from '../smallComponents/FriendRequestUser';
import { handleShowRequestLists } from '../api';


export default function FriendRequest() {
  const auth = useAuth();
  const [friendRequests,setFriendRequests] = useState([]);

  useEffect(()=>{
    if(auth.user){
      const friendRequestLists = async () => {
        const response =await handleShowRequestLists(auth.user.id);
        if(response.success){
          setFriendRequests(response.data.requests);
        }
      }
      friendRequestLists();
    }
  },[auth])
  
  return (
    <div style={auth.friendRequest ? innerStyle : {}} className={style.friendReqContainer}>
      <div className={style.FriendRequestBar}>
        <button onClick={()=>{auth.setFriendRequest(false)}} >X</button>
        <h2>Friend Requests</h2>
      </div>
      <div>

      { friendRequests.map((requests,key)=>{
        return <FriendRequestUser requests={requests} key={key}/>
      })}

      { friendRequests.length === 0 && <div className={style.noRequestPending}>No Pending Requests</div>}

      </div>
    </div>
  )
}



const innerStyle = {
  width:315
}