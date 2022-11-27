import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Followings from "../components/Followings";
import HobbiesDisplay from "../components/HobbiesDisplay";
import ProfileDisplay from "../components/ProfileDisplay";
import Post from "../components/Post";

function Profile() {

    const location = useLocation();
    const { pathname } = location;
    const [user, setUser] = useState(null);
    const [follower, setFollower] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [postWindow, setPostWindow] = useState("hidden");
    const [BlogList,setBlogList] = useState([]);

    const history = useHistory();

    const fetchpost = async () => {
      console.log("getting posts from the user");
      const res = await fetch(`http://localhost:4000/api/${pathname.split("/")[2]}/blogs`, {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      const data = await res.json();
      if(data.blogs != null){
          console.log("fetching all posts from profile component")
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
        setFollower(data.user.username);
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

//   const displayPage = () => {
//     switch(searchPage) {
//         case 0: 
//             return <SearchSelection searchSelection={searchSelection} setSearchSelection={setSearchSelection} setSearchPage={setSearchPage} closeSelection={closeSelection} />
//         case 1:
//             return <LookUp searchSelection={searchSelection} setSearchSelection={setSearchSelection} setSearchPage={setSearchPage} closeSelection={closeSelection} />
//     }
//   }

    return (
      <div className="default">
        { authenticated ?

        <div>
          <Post postWindow = {postWindow} showPostWindow={setPostWindow} fetchpost={fetchpost}/>
          <div className="three-way-grid">
            <Sidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} showPostWindow={setPostWindow} />
            {/* <HobbiesDisplay user={user}/> */}
            <ProfileDisplay user={user} BlogList={BlogList} follower={follower} />
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
  
export default Profile;