import React, { useEffect, useState } from 'react'
import Friend from './Friend'
import { useAuth } from '../hooks/index';
import { handleFetchFriendsLists } from '../api';

export default function FriendList() {
  const auth = useAuth();
  const [friends,setFriends] = useState([]);      //hooks to get all friends of current user

  // fetching all the friends of current user
  useEffect(()=>{
    const fetchFriendList = async () =>{
      const response = await handleFetchFriendsLists(auth.user.id);
      if(response.success){
        setFriends(response.data.friends);
      }
    }
    if(auth.user){
      fetchFriendList();
    }
  },[auth])


  return (
    // calling all friends mapping over friendlists
    <div>
        { friends.map((friend,key)=>{
          return  <Friend friend={friend} key={key} />;
        })}
    </div>
  )
}
