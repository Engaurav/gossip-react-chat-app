import React, { useEffect, useState }  from "react";
import styles from "../styles/chatbox.module.css";
import  io from 'socket.io-client';
import avatar from "../avatars/avatar-1.jpg";
import SendMessage from "../smallComponents/SendMessage";
import RecieveMessage from "../smallComponents/RecieveMessage";



const socket = io.connect("http://localhost:3001")

const Chatbox = (props) => {

  const [chats,setChats] = useState([]);
  const [message,setMessage] = useState('');
  const [recieve,setRecieve] = useState('');
  const [friend,setFriend] =useState('');
  const [name,setName] = useState('GOSSIP APP');


  useEffect(()=>{
    console.log("Props",props.friend)
    
    if(props.friend){
      const {data} = props.friend;
      console.log("Props",data)
      if(data){
        const { friends,friendship } = data;
        console.log("Friend",friends);
        console.log("frienship",friendship);
        setFriend(friendship._id);
        setName(friends.name);
      }
    }
    // setName(props.friend.data.friend.name);
  },[props])



  useEffect(()=>{
    setChats([{person:"send",message:"Hiii"},{person:"recieve",message:"HEy"},{person:"send",message:"How are You"},{person:"recieve",message:"Fine You?"}])
  },[]);


  const joinFriend = () => {
    if(friend !==''){
      socket.emit("join_friend",friend);
    }
  };
  joinFriend();


  const sendMessageForm = async  (e) => {
    e.preventDefault();
    if(message!==''){
      socket.emit("send_message",{message , friend});
      setChats([...chats,{person:"send",message:message}])
      setMessage('');
    }
  };


  useEffect(()=>{
    socket.on("recieve_message",(data)=>{
      setRecieve(data.message)
    });
  },[socket])



 

  // useEffect for recieve Message
  useEffect(()=>{
    // console.log("Recieve Message",recieve)
    if(recieve!==''){
      setChats([...chats,{person:"recieve",message:recieve}])
    }
  },[recieve])


  // useEffect For Chats
  useEffect(()=>{
    // console.log("Chats",chats)
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
                if(value.person==='send'){
                  return <SendMessage message={value.message} key={index} />
                }else{
                  return <RecieveMessage message={value.message} key={index} />
                }
              }):""}
              
             </ul>
          </div>
          
        </div>

        {/* input form container */}
        <div className={styles.form}>
          <form onSubmit={sendMessageForm}>
            {/* <input placeholder="Message...." name="message" value={message} onChange={(e)=>{setMessage(e.target.value)}} /> */}
            <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}}></textarea>
            <button type="submit"><img src="https://cdn-icons-png.flaticon.com/512/3814/3814305.png" alt="Send" width="25px" /></button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
