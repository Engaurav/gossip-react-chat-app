import React from 'react';
import style from '../styles/friend.module.css';
import avatar from "../avatars/avatar-1.jpg";


export default function Friend() {
  return (
    <div className={style.friendContainer}>
        <div className={style.friendImageContainer}>
            <div className={style.friendImage}>
                <img src={avatar} alt='FriendImage'/>
            </div>
        </div>
        <div className={style.friendName}>
            Gaurav Singh
        </div>
    </div>
  )
}