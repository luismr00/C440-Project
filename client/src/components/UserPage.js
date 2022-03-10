import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function UserPage() {
  const [firstName, setFirstName] = useState("");
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  const Initialize = async () => {
    const res = await fetch("http://localhost:4000/api/initialize", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json();
    if(data.success) {
      console.log("initialize successful");
    } else {
      console.log("initialize failed");
    }
  }

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
      setFirstName("");
      setUser(null);
    } else {
      console.log("logout failed");
    }
  }

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
      setFirstName(data.user.firstName);
      setAuthenticated(true);
    } else {
      console.log("fetch cookie failed");
    }
  }

  useEffect(() => {
    if(location.state) {
      console.log("state: ", location.state.state);
      setFirstName(location.state.state.firstName);
      setAuthenticated(true);
    }
    else  {
      fetchcookie();
    }
  }, [location.state]);

    return (
      <div className="App">
        { authenticated ?
          <div>
            <h1>Welcome, {firstName}</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={Initialize}>Initialize Database</button>
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
  
export default UserPage;