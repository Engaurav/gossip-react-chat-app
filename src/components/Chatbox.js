import React, { useEffect, useState }  from "react";
import styles from "../styles/chatbox.module.css";
import  io from 'socket.io-client';
import avatar from "../avatars/avatar-1.jpg";
import SendMessage from "../smallComponents/SendMessage";
import RecieveMessage from "../smallComponents/RecieveMessage";
import { handleExportChats } from "../api";
import { useAuth } from "../hooks";
import '../styles/chatbox.css'
import '../styles/gossip.css'
import Inbox from "../smallComponents/Inbox";


// socket io server links
const socket = io.connect("https://gossip-chat-server.herokuapp.com")

const Chatbox = (props) => {

  // calling auth for current user
  const auth = useAuth();
  //Hooks
  const [chats,setChats] = useState([]);          // chat hook for setting chats
  const [chatId,setChatId] = useState('');         //hook for setting chat id
  const [message,setMessage] = useState('');    //hooks for sending messages
  const [recieve,setRecieve] = useState('');      //hook for recieving messages
  const [friend,setFriend] =useState('');         //hook for setting friend name
  const [exportMessage,setExportMessage] = useState('');      //hook for exporting messages to database api


  // useEffect to clear message box for a new user
  useEffect(()=>{
    setChats([]);
  },
  [auth.currentFriend])


  // hooks to manage props data for the first time if chat clicked
  useEffect(()=>{
    if(props.friend){
      const {data} = props.friend;
      if(data){
        const { friends,friendship } = data;
        setFriend(friendship._id);
      }
    }
  },[props])


  // hooks for getting current friend detail
  useEffect(()=>{
    if(props.friend){
      const {data} = props.friend;
      if(data){
        const { friends,friendship } = data;
        setChats(friendship.chats.message);
        setChatId(friendship.chats._id);
      }
    }
  },[friend])


  // hooks for setting up chat server according to friendship ID
  useEffect(()=>{
    // console.log("JOIN Friend")
    const joinFriend = () => {
      if(friend !==''){
        socket.emit("join_friend",friend);
      }
    };
    joinFriend();
  },[friend])
  

  // funcion to mannage send message
  const sendMessageForm = async  (e) => {
    e.preventDefault();
    if(message!==''){
      socket.emit("send_message",{message , friend});
      setExportMessage(message);
      auth.setLastMessage(message);
      setChats([...chats,{person:auth.user.id,message:message}]);
      setMessage('');
    }
  };


  // useEffect for storing data in database
  useEffect(()=>{
    if(exportMessage!==''){
      const exportChats = async () => {
        const response = await handleExportChats({person:auth.user.id,message:exportMessage},friend);
        setExportMessage('');
      }
      exportChats();
    }
  },[exportMessage])



  // useEffect for recieveing messages
  useEffect(()=>{
    socket.on("recieve_message",(data)=>{
      setRecieve(data.message);
      auth.setLastMessage(data.message);
    });
  },[socket])



 

  // useEffect for setting up chats if recieve Message
  useEffect(()=>{
    if(recieve!==''){
      setChats([...chats,{person:"recieve",message:recieve}])
    }
  },[recieve])


  // useEffect For Chats to bottom if new message come
  useEffect(()=>{
    let ul = document.getElementById("ul");
    ul.scrollTop = ul.scrollHeight;
  },[chats])
  


  return (
    <div className={styles.ChatboxContainer}>
      <div className={styles.Chatbox}>
          {/* profile bar */}
          <div className={styles.bar}>

          {/* friend image */}
          { auth.currentFriend !== 'Gossip' && 
          <div className={styles.image}>
            <img src={avatar} alt='FriendImage'/>
          </div>}
          {/* other detail */}
          <div className={styles.detail}>
          { auth.currentFriend === 'Gossip'  ? 
            <div className="goosip">
              { auth.currentFriend === 'Gossip' &&  <Inbox/>}

              <h1>
                <span>Chat With</span>
                <div className="message">
                  <div className="word1">Family</div>
                  <div className="word2">World</div>
                  <div className="word3">Friends</div>
                </div>
              </h1>
            </div>
            :
            <h2>{auth.currentFriend}</h2>}
            {/* <button><img src="https://cdn-icons-png.flaticon.com/512/225/225287.png" alt="dropdown" width="25px" /></button> */}
          </div>
        </div>
        {/* messagage box */}
        <div className={styles.messageBox}>
          <div className={styles.messageBoxContainer}>
            <ul id="ul">
              { chats.length === 0 && auth.currentFriend !== 'Gossip' && <div style={{background:"#8a89a1",textAlign:"center",color:"white",marginBottom:200}}><div className="spinner"></div><h3>Fetching Chats</h3></div> }

              { chats.length > 0 ? chats.map((value,index)=>{
                if(value.person===auth.user.id){
                  // for sending message component
                  return <SendMessage message={value.message} key={index} />
                }else{
                  // for sending recieving component
                  return <RecieveMessage message={value.message} key={index} />
                }
              }):""}
             </ul>
          </div>
        </div>

        {/* input form container */}
        { friend !== '' ? 
        <div className={styles.form}>
          <form onSubmit={sendMessageForm}>
            {/* <input placeholder="Message...." name="message" value={message} onChange={(e)=>{setMessage(e.target.value)}} /> */}
            <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}}></textarea>
            <button type="submit"><img src="https://cdn-icons-png.flaticon.com/512/3814/3814305.png" alt="Send" width="25px" /></button>
          </form>
        </div> : <h2 style={{margin:10,textAlign:"end"}}>Chatting Web Application</h2>}
      </div>
    </div>
  );
};

export default Chatbox;
