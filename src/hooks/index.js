import { useContext, useEffect, useState } from "react";
import { userLogin } from "../api";
import { AuthContext } from "../provider/AuthProvider";
import jwt_decode from "jwt-decode";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "../api/helper";
import { LOCALSTORAGE_TOKEN_KEY } from "../api/constants";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [currentFriend,setCurrentFriend] = useState('Gossip');
  const [loading, setLoading] = useState(true);
  const [friendRequest , setFriendRequest] = useState(false);
  const [chat,setChat ] = useState({});
  const [lastMessage,setLastMessage] = useState('');
  const [showChatBox,setShowChatBox] = useState(true);
  

  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

    if (userToken) {
      const user = jwt_decode(userToken);
      setUser(user);
    }
    setFriendRequest(false);
    setLoading(false);

  }, []);

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token);
      var user = jwt_decode(response.data.token);
      setUser({
        id: user.id,
        name: user.name
      });
      setLoading(false);
      return response;
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  };
  const logout = () => {
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    setUser(null);
  };
  return {
    user,
    loading,
    login,
    logout,
    friendRequest,
    setFriendRequest,
    chat,
    setChat,
    lastMessage,
    setLastMessage,
    showChatBox,
    setShowChatBox,
    currentFriend,
    setCurrentFriend
  };
};
