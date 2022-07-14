import React, { useState } from "react";
import { searchFriends } from "../api";
import { useAuth } from "../hooks";
import style from "../styles/searchFriends.module.css";
import SearchList from "./SearchList";


export default function SearchFriends(props) {
  const auth = useAuth();                             //auth to fetch current user
  const [search, setSearch] = useState("");           //hooks for getting search value
  const [searchList,setSearchList] = useState([]);     //hooks for setting search fetch results

  // function to handle search input 
  const handleSearchFriend = async () => {
    const response = await searchFriends(search);
    setSearchList(response.data.users);
  };


  return (
    <div className={style.SearchFriend}>
      <div id={style.search_bar}>
        <div id={style.search_back}>
          <button onClick={props.handleSearchClose}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/122/122637.png"
              alt="Back"
              width="30px"
            />
          </button>
        </div>
        <div id={style.search_bar_title}>Search</div>
      </div>
      <div className={style.SearchInput}>
        <input
          type={"search"}
          value={search}
          placeholder="Search with Name or Email"
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearchFriend();
          }}
        />
      </div>
      { searchList ? searchList.map((user,key)=>{
        if(user._id === auth.user.id){
          return "";
        }
        // sending all the search lists
        return <SearchList user={user} key = {key} />
      }) : <div className={style.noResult}>No Result.</div>}
    </div>
  );
}
