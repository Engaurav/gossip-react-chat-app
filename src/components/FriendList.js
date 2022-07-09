import React, { useEffect, useState } from 'react'
import Friend from './Friend'
import { useAuth } from '../hooks/index';
import { handleFetchFriendsLists } from '../api';

export default function FriendList() {
  const auth = useAuth();
  const [friends,setFriends] = useState([]);
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
    <div>
        { friends.map((friend,key)=>{
          return  <Friend friend={friend} key={key} />;
        })}
    </div>
  )
}
