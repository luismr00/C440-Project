import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Followings from "../components/Followings";
import SearchDisplay from "../components/SearchDisplay";
import SearchSelection from "../components/SearchSelection";
import LookUp from "../components/LookUp";
import Post from "../components/Post";
// import MutualFollowingSearch from "../components/MutualFollowingSearch";
import SelectTags from "../components/SelectTags";

function Search() {

    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState(null);
    const [mutualHobbyUsers, setMutualHobbyUsers] = useState(null);
    // const [view, setView] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [postWindow, setPostWindow] = useState("hidden");
    const [BlogList,setBlogList] = useState([]);
    const [searchSelection, setSearchSelection] = useState("hidden");
    const [searchPage, setSearchPage] = useState(0);
    const [switchDisplay, setSwitchDisplay] = useState(0);
    const [userHobbies, setUserHobbies] = useState([]);
    const [tags, setTags] = useState('');
    const history = useHistory();
    let hobbySelections = new Set();

    const fetchpost = async () => {
      const res = await fetch("http://localhost:4000/api/blogs", {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.blogs != null){
          console.log("fetching post from mainpage component")
          console.log(data.blogs);
          setBlogList(data.blogs);
      }
    }

    const fetchusers = async () => {
      const res = await fetch("http://localhost:4000/api/users/search", {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.users != null){
          console.log("fetching all users");
          console.log(data.users);
          setAllUsers(data.users);
      }
    }    

    const fetchMutualHobbyUsers = async () => {
      const res = await fetch("http://localhost:4000/api/users/search/mutualHobbies", {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.users != null){
          console.log("fetching all users with mutual hobbies");
          console.log(data.users);
          setMutualHobbyUsers(data.users);
      }
    }    

    const fetchHobbies = async () => {
      const res = await fetch("http://localhost:4000/api/getHobbies", {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.hobbies != null){
  
          console.log("Showing hobbies fetched");
          console.log(data.hobbies);
          setUserHobbies(data.hobbies);
      }
    }
  
    useEffect(() => {
      fetchusers();
      fetchpost();
      fetchHobbies();
      fetchMutualHobbyUsers();
    }, []);

  const logout = async () => {
    const res = await fetch("http://localhost:4000/logout", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json();
    if(data.success) {
      console.log("logout successful");
      setAuthenticated(false);
      setUser(null);
    } else {
      console.log("logout failed");
    }
  }

  useEffect(() => {
    const fetchcookie = async () => {
      const res = await fetch("http://localhost:4000/", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

      })
      const data = await res.json();
      if(data.user != null){
        setUser(data.user);
        setAuthenticated(true);
        console.log(data.user)
      } else {
        console.log("user is not logged in");
        setAuthenticated(false);
        history.push("/");
      }
    }
    if(!authenticated){
      fetchcookie();
    }
  }, [authenticated]);

  const closeSelection = () => {
    setSearchSelection("hidden");
    setSearchPage(0);
  }

  const openPostWindow = () => {
    setSwitchDisplay(0);
    setPostWindow("visible")
  }

  const closePostWindow = () => {
    // console.log("hobbySelections values before closing and after");
    // console.log(hobbySelections);
    hobbySelections = new Set();
    setPostWindow("hidden");
    setSwitchDisplay(null);
    // console.log(hobbySelections);
  }

  const handleUserSelection = (view, username) => {

    //must get view as well for either individual search or multiple searches
    if (view === 'single') {

      if(!allUsers[username]) {
        console.log("Cannot find the user. Try again.");
      } else {
        let selected = {};
        selected[username] = allUsers[username];
        setUserInfo(selected);
        closeSelection();
      }

    } else if (view === 'mutual-hobbies') {
      // setView(view);
      setUserInfo(mutualHobbyUsers);
      closeSelection();
    }
  }

  const postDisplay = () => {
    switch(switchDisplay) {
        case 0: 
            return <SelectTags setTags={setTags} hobbySelections={hobbySelections} userHobbies={userHobbies} setSwitchDisplay={setSwitchDisplay} postWindow = {postWindow} closePostWindow={closePostWindow} tagDisplay={userHobbies.length === 0 ? false : true}/>
        case 1: 
            return <Post tags={tags} setTags={setTags} setSwitchDisplay={setSwitchDisplay} postWindow = {postWindow} closePostWindow={closePostWindow} fetchpost={fetchpost}/>
      }
  }

  const displayPage = () => {
    switch(searchPage) {
        case 0: 
            return <SearchSelection searchSelection={searchSelection} setSearchSelection={setSearchSelection} setSearchPage={setSearchPage} closeSelection={closeSelection} handleUserSelection={handleUserSelection} />
        case 1:
          return <LookUp allUsers={allUsers} handleUserSelection={handleUserSelection} searchSelection={searchSelection} setSearchSelection={setSearchSelection} setSearchPage={setSearchPage} closeSelection={closeSelection} />
        // case 2: 
        //     return <MutualFollowingSearch searchSelection={searchSelection} setSearchSelection={setSearchSelection} setSearchPage={setSearchPage} closeSelection={closeSelection} />
        }
      }

    return (
      <div className="default">
        { authenticated ?

        <div>
          {displayPage()}
          {postDisplay()}
          <div className="three-way-grid">
            <Sidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} openPostWindow={openPostWindow} />
            <SearchDisplay user={user} userInfo={userInfo} setSearchSelection={setSearchSelection}/>
            <Followings user={user} />
          </div>
        </div>
          : 
          <div>
            <h1>Please login</h1>
            <a href="/"><p>Sign in</p></a>
            <a href="/register"><p>Register</p></a>
          </div>
        }
      </div>
    );
}
  
export default Search;