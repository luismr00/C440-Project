import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Followings from "../components/Followings";
import HobbiesDisplay from "../components/HobbiesDisplay";
import ProfileDisplay from "../components/ProfileDisplay";
import Post from "../components/Post";
import SelectTags from "../components/SelectTags";
import FollowPageDisplay from "../components/FollowPageDisplay";

function FollowPage(props) {

    const location = useLocation();
    const { pathname } = location;
    const [user, setUser] = useState(null);
    const [follower, setFollower] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [postWindow, setPostWindow] = useState("hidden");
    const [BlogList,setBlogList] = useState([]);
    const [switchDisplay, setSwitchDisplay] = useState(0);
    const [userHobbies, setUserHobbies] = useState([]);
    const [tags, setTags] = useState('');
    const history = useHistory();
    let hobbySelections = new Set();

    console.log("checking view props");
    // console.log(location.state.view);

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

    // const fetchUserFollowerData = async () => {
    //     const res = await fetch(`http://localhost:4000/api/${pathname.split("/")[1]}/follows`, {
    //       method: "GET",
    //       headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //       },
    //   })
    //   const data = await res.json();
    //   if(data.followData != null){
    //       console.log("fetching all posts from profile component")
    //       console.log(data.followData);
    //       setBlogList(data.followData);
    //   }
    // }

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
      fetchpost();
      fetchHobbies();
    //   fetchUserFollowerData();
    }, []);

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


  const postDisplay = () => {
    switch(switchDisplay) {
        case 0: 
            return <SelectTags setTags={setTags} hobbySelections={hobbySelections} userHobbies={userHobbies} setSwitchDisplay={setSwitchDisplay} postWindow = {postWindow} closePostWindow={closePostWindow} tagDisplay={userHobbies.length === 0 ? false : true}/>
        case 1: 
            return <Post tags={tags} setTags={setTags} setSwitchDisplay={setSwitchDisplay} postWindow = {postWindow} closePostWindow={closePostWindow} fetchpost={fetchpost}/>
      }
  }

    return (
      <div className="default">
        { authenticated ?

        <div>
          {postDisplay()}
          {/* <Post postWindow = {postWindow} showPostWindow={setPostWindow} fetchpost={fetchpost}/> */}
          <div className="three-way-grid">
            <Sidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} openPostWindow={openPostWindow} />
            {/* <HobbiesDisplay user={user}/> */}
            <FollowPageDisplay user={user} view={location.state ? location.state.view : null}/>
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
  
export default FollowPage;