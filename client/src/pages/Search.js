import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Followings from "../components/Followings";
import SearchDisplay from "../components/SearchDisplay";
import SearchSelection from "../components/SearchSelection";
import LookUp from "../components/LookUp";

function Search() {

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [postWindow, setPostWindow] = useState("hidden");
    const [searchSelection, setSearchSelection] = useState("hidden");
    const [searchPage, setSearchPage] = useState(0);
    const history = useHistory();

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

  const displayPage = () => {
    switch(searchPage) {
        case 0: 
            return <SearchSelection searchSelection={searchSelection} setSearchSelection={setSearchSelection} setSearchPage={setSearchPage} closeSelection={closeSelection} />
        case 1:
            return <LookUp searchSelection={searchSelection} setSearchSelection={setSearchSelection} setSearchPage={setSearchPage} closeSelection={closeSelection} />
    }
  }

    return (
      <div className="default">
        { authenticated ?

        <div>
          {displayPage()}
          <div className="three-way-grid">
            <Sidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} showPostWindow={setPostWindow} />
            <SearchDisplay user={user} setSearchSelection={setSearchSelection}/>
            <Followings />
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