// import { loginApi } from "./constants"

import { exportChatsApi, friendDetailApi, friendListFetchApi, friendRequestAcceptApi, friendRequestDeleteApi, friendRequestListsApi, friendRequestSendApi, friendRequestShowApi, LOCALSTORAGE_TOKEN_KEY, loginApi, registerApi, searchApi } from "./constants";
import { getFormBody } from "./helper";


const customFetch = async (url, { body, ...customConfig }) => {
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
    };
  
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  
    const config = {
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    };
    if (body) {
      config.body =getFormBody(body);
    }
    // console.log("getform ",getFormBody(body))
  
    try {
      const response = await fetch(url,config);
      return await response.json();
         
  
    } catch (error) {
      console.error('error');
      return {
          data : error.message,
          success: false
      }
    }
  };
  




export const userLogin =  (email,password) => {
 
    return customFetch(loginApi,{
        method : 'POST',
        body : {
             email,password
        }
    })
}

export const userRegister = (body) => {
  return customFetch(registerApi,{
    method : 'POST',
    body
  })
}

export const searchFriends = (search) =>{
  return customFetch(`${searchApi}/${search}`,{
    method : 'GET'
  });
}

export const handleFriendSendRequest = (body) => {
  return customFetch(friendRequestSendApi,{
    method: 'POST',
    body
  })
}

export const handleFriendShowRequest = (body) => {
  return customFetch(friendRequestShowApi,{
    method: 'POST',
    body
  })
}
export const handleFriendDeleteRequest = (id) => {
  return customFetch(`${friendRequestDeleteApi}/${id}`,{
    method: 'DELETE',
  })
}
export const handleShowRequestLists = (id) => {
  return customFetch(`${friendRequestListsApi}/${id}`,{
    method: 'GET',
  })
}
export const handleFriendRequestAccept = (id) => {
  return customFetch(`${friendRequestAcceptApi}/${id}`,{
    method: 'GET',
  })
}

export const handleFetchFriendsLists = (id) => {
  return customFetch(`${friendListFetchApi}/${id}`,{
    method: 'GET',
  })
}
export const handleFechFriendDetail = (user,friend) => {
  return customFetch(`${friendDetailApi}/${user}/data/${friend}`,{
    method: 'GET',
  })
}


export const handleExportChats= (chats,id) => {
  return customFetch(`${exportChatsApi}/${id}`,{
    method: 'POST',
    body : chats
  })
}



