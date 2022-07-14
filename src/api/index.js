
// fetching all api links
import { exportChatsApi, friendDetailApi, friendListFetchApi, friendRequestAcceptApi, friendRequestDeleteApi, friendRequestListsApi, friendRequestSendApi, friendRequestShowApi, LOCALSTORAGE_TOKEN_KEY, loginApi, registerApi, searchApi } from "./constants";
import { getFormBody } from "./helper";


// function to manage all data for api calls
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
  



// login api call
export const userLogin =  (email,password) => {
    return customFetch(loginApi,{
        method : 'POST',
        body : {
             email,password
        }
    })
}

// new user api call
export const userRegister = (body) => {
  return customFetch(registerApi,{
    method : 'POST',
    body
  })
}

// search friend api call
export const searchFriends = (search) =>{
  return customFetch(`${searchApi}/${search}`,{
    method : 'GET'
  });
}


// handle request api calls
export const handleFriendSendRequest = (body) => {
  return customFetch(friendRequestSendApi,{
    method: 'POST',
    body
  })
}

// fucntion to get all friend request of current user
export const handleFriendShowRequest = (body) => {
  return customFetch(friendRequestShowApi,{
    method: 'POST',
    body
  })
}

// function to handle delete friend request api call
export const handleFriendDeleteRequest = (id) => {
  return customFetch(`${friendRequestDeleteApi}/${id}`,{
    method: 'DELETE',
  })
}

// function to handle show friend request status api call
export const handleShowRequestLists = (id) => {
  return customFetch(`${friendRequestListsApi}/${id}`,{
    method: 'GET',
  })
}

// function to handle accept friend request api call
export const handleFriendRequestAccept = (id) => {
  return customFetch(`${friendRequestAcceptApi}/${id}`,{
    method: 'GET',
  })
}

// function to fetch friendlist api call
export const handleFetchFriendsLists = (id) => {
  return customFetch(`${friendListFetchApi}/${id}`,{
    method: 'GET',
  })
}

// function to fetch friend detail api call
export const handleFechFriendDetail = (user,friend) => {
  return customFetch(`${friendDetailApi}/${user}/data/${friend}`,{
    method: 'GET',
  })
}

// function to exporting new messages api call
export const handleExportChats= (chats,id) => {
  return customFetch(`${exportChatsApi}/${id}`,{
    method: 'POST',
    body : chats
  })
}



