import React, { useEffect, useState }  from "react";
import styles from "../styles/chatbox.module.css";
import  io from 'socket.io-client';
import avatar from "../avatars/avatar-1.jpg";
import SendMessage from "../smallComponents/SendMessage";
import RecieveMessage from "../smallComponents/RecieveMessage";
import { handleExportChats } from "../api";
import { useAuth } from "../hooks";



const socket = io.connect("http://localhost:3001")

const Chatbox = (props) => {

  const auth = useAuth();
  const [chats,setChats] = useState([]);
  const [chatId,setChatId] = useState('');
  const [message,setMessage] = useState('');
  const [recieve,setRecieve] = useState('');
  const [friend,setFriend] =useState('');
  const [name,setName] = useState('GOSSIP APP');
  const [exportMessage,setExportMessage] = useState('');


  useEffect(()=>{
    console.log("Props Chatbox",props)
    
    if(props.friend){
      const {data} = props.friend;
      if(data){
        const { friends,friendship } = data;
        setFriend(friendship._id);
      }
    }
  },[props])


  useEffect(()=>{
    console.log("Friend",friend);
    
    if(props.friend){
      const {data} = props.friend;
      if(data){
        const { friends,friendship } = data;
        setName(friends.name);
        setChats(friendship.chats.message);
        setChatId(friendship.chats._id);
      }
    }
  },[friend])


  useEffect(()=>{
    console.log("JOIN Friend")
    const joinFriend = () => {
      if(friend !==''){
        socket.emit("join_friend",friend);
      }
    };
    joinFriend();
  },[friend])
  


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


  useEffect(()=>{
    if(exportMessage!==''){
      const exportChats = async () => {
        const response = await handleExportChats({person:auth.user.id,message:exportMessage},friend);
        setExportMessage('');
      }
      exportChats();
    }
  },[exportMessage])




  useEffect(()=>{
    socket.on("recieve_message",(data)=>{
      setRecieve(data.message);
      auth.setLastMessage(data.message);
    });
  },[socket])



 

  // useEffect for recieve Message
  useEffect(()=>{
    if(recieve!==''){
      setChats([...chats,{person:"recieve",message:recieve}])
    }
  },[recieve])


  // useEffect For Chats
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
          <div className={styles.image}>
            <img src={avatar} alt='FriendImage'/>
          </div>
          {/* other detail */}
          <div className={styles.detail}>
            <h2>{name}</h2>
            <button><img src="https://cdn-icons-png.flaticon.com/512/225/225287.png" alt="dropdown" width="25px" /></button>
          </div>
        </div>
        {/* messagage box */}
        <div className={styles.messageBox}>
          <div className={styles.messageBoxContainer}>
            <ul id="ul">
              {/* <li className={styles.myMessage}>
                <p>Hiii ...</p>
                <p> {message}</p>
              </li>
              <li className={styles.myMessage}>
                <p>Hiii ...</p>
                <p> {message}</p>
              </li>
              <li className={styles.recieve}>
                <p>Good...</p>
                <p>{recieve}</p>
              </li> */}
              { chats.length > 0 ? chats.map((value,index)=>{
                if(value.person===auth.user.id){
                  return <SendMessage message={value.message} key={index} />
                }else{
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
