import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Followings from "../components/Followings";
import HobbiesDisplay from "../components/HobbiesDisplay";
import Post from "../components/Post";
// import SearchDisplay from "../components/SearchDisplay";
// import SearchSelection from "../components/SearchSelection";
// import LookUp from "../components/LookUp";
import HobbySelection from "../components/HobbySelection";
import AddHobby from "../components/AddHobby";
import HobbyCategories from "../components/HobbyCategories";

function Hobbies() {

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [postWindow, setPostWindow] = useState("hidden");
    const [BlogList,setBlogList] = useState([]);
    const [hobbySelection, setHobbySelection] = useState("hidden");
    const [searchPage, setSearchPage] = useState(0);
    const history = useHistory();

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
  
    useEffect(() => {
      fetchpost();
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
    setHobbySelection("hidden");
    setSearchPage(0);
  }

  const displayPage = () => {
    switch(searchPage) {
        case 0: 
            return <HobbySelection hobbySelection={hobbySelection} setHobbySelection={setHobbySelection} setSearchPage={setSearchPage} closeSelection={closeSelection} />
        case 1: 
            return <AddHobby hobbySelection={hobbySelection} setHobbySelection={setHobbySelection} setSearchPage={setSearchPage} closeSelection={closeSelection} />
        case 2: 
            return <HobbyCategories hobbySelection={hobbySelection} setHobbySelection={setHobbySelection} setSearchPage={setSearchPage} closeSelection={closeSelection} />
      }
  }

    return (
      <div className="default">
        { authenticated ?

        <div>
          {displayPage()}
          <Post postWindow = {postWindow} showPostWindow={setPostWindow} fetchpost={fetchpost}/>
          <div className="three-way-grid">
            <Sidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} showPostWindow={setPostWindow} />
            {/* <SearchDisplay user={user} setSearchSelection={setSearchSelection}/> */}
            <HobbiesDisplay user={user} setHobbySelection={setHobbySelection}/>
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
  
export default Hobbies;