import React from "react";
import styles from "../styles/chatbox.module.css";

export default function SendMessage(props) {
  return (
    <li className={styles.myMessage}>
      <p>{props.message}</p>
    </li>
  );
}
