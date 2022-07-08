import React, { useState } from "react";
import { searchFriends } from "../api";
import style from "../styles/searchFriends.module.css";
import SearchList from "./SearchList";
export default function SearchFriends(props) {
  const [search, setSearch] = useState("");
  const [searchList,setSearchList] = useState([]);
  const handleSearchFriend = async () => {
    const response = await searchFriends(search);
    setSearchList(response.data.users);
    console.log(searchList);
    // console.log(response);
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
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearchFriend();
          }}
        />
      </div>
      { searchList ? searchList.map((user)=>{
        return <SearchList user={user}/>
      }) : <div className={style.noResult}>No Result.</div>}
    </div>
  );
}
