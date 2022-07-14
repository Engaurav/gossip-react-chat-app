import React, { useEffect, useState } from 'react'
import style from '../styles/friendrequest.module.css'
import { useAuth } from "../hooks";
import FriendRequestUser from '../smallComponents/FriendRequestUser';
import { handleShowRequestLists } from '../api';


export default function FriendRequest() {
  const auth = useAuth();
  const [friendRequests,setFriendRequests] = useState([]);        //hooks to get all friend request of current user



  // useEffect for fetching friendlist from API
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

      {/* if friend requests  */}
      { friendRequests.length > 0 && friendRequests.map((requests,key)=>{
        return <FriendRequestUser requests={requests} key={key}/>
      })} 

      {/* if no friend requests  */}
      { friendRequests.length === 0 && <div className={style.noRequestPending}>No Pending Requests</div>}
      </div>
    </div>
  )
}



const innerStyle = {
  width:315
}