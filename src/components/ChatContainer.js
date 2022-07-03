import React, { Component } from "react";
import styles from '../styles/chatContainer.module.css'
import Chatbox from "./Chatbox";
import Chats from "./Chats";
import Profile from "./Profile";

class ChatContainer extends Component {
  render() {
    return (
      <div className={styles.ChatContainer}>
        <Chats />
        <Chatbox />
        <Profile />
      </div>
    );
  }
}

export default ChatContainer;
