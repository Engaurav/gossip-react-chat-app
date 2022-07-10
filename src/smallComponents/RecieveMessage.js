import React from "react";
import styles from "../styles/chatbox.module.css";

export default function RecieveMessage(props) {
  return (
    <li className={styles.recieve}>
      <p>{props.message}</p>
    </li>
  );
}
