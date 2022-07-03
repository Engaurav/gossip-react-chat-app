import React, { Component } from 'react';
import logo from '../chat-logo.jpg';
import avatar from '../avatars/avatar-1.jpg'
import styles from '../styles/navbar.module.css'

class Navbar extends Component {
  render() {
    return (
      <div className={styles.navbar}>
        <div className='chatBrandLogo'><img src={logo} alt='Logo' width="250px"/></div>
        <div className={styles.avatar}><img src={avatar} alt="Profile" width="66px" /></div>
      </div>
    )
  }
}

export default Navbar;