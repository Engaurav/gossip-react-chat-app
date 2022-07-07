import style from "../styles/profile.module.css";
import avatar from "../avatars/avatar-1.jpg";
import { useAuth } from "../hooks";


const Profile = (props) => {
  const auth = useAuth();
  return (
  <div className={style.Profile}>
    <div id={style.profile_bar}>
      <div id={style.profile_back}><button onClick={props.handleProfileClose}><img src="https://cdn-icons-png.flaticon.com/512/122/122637.png" alt="Back" width="30px" /></button></div>
      <div id={style.profile_bar_title}>Profile</div>
    </div>
    <div className={style.profile_pic}>
      <div>
        <img src={avatar}  alt="ProfilePic" width="200px"/>
      </div>
    </div>

    <div id={style.profile_name}>
      <div id={style.profile_name_title}>Your Name</div>
      <div id={style.profile_name_v}>{ auth.user ? auth.user.name : "Profile Name"}</div>
    </div>

    <div className={style.profile_info}>
      <div className={style.profile_info_title}>Status</div>
      <div className={style.profile_info_v}>{ auth.user ? "Life is not a sad story. Maybe you’re just going through a bad chapter." : "Life is not a sad story. Maybe you’re just going through a bad chapter."}</div>
    </div>

    <div className={style.profile_info}>
      <div className={style.profile_info_title}>About</div>
      <div className={style.profile_info_v}>{ auth.user ? "I’m born to express, not to impress." : "I’m born to express, not to impress."}</div>
    </div>
  </div>
  )
};

export default Profile;
