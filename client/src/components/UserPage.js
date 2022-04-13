import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";


function UserPage() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();
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
        setAuthenticated(true);
        setUser(data.user);
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

    return (
      <div className="App default">
        { authenticated ?
          <div>
            <h1>Welcome, {user?.firstName} </h1>
            <button onClick={logout}>Logout</button>
            <button onClick={Initialize}>Initialize Database</button>
            <button><Link to='/new-blog'>Create Blog Post</Link></button>
            <button><Link to='/blogs'>All Blogs</Link></button>
            <br/>
            <br/>
            <h3>Hobbies</h3>
            <form style={{margin: '0'}}>
                <div style={{width: '42%', margin:'0 auto', display: 'flex',}} >
                    <input style={{padding: '10px 0'}} type="text" placeholder="Hobby" />
                </div>
                <button>Add Hobby</button>
            </form>
            <br/>
            <br/>
            <h3>Users</h3>
            <table style={{margin: 'auto'}}>
              <thead>
                <tr>
                  <th>No Blogs:</th>
                  <th>No Comments:</th>
                  <th>Negative Comments:</th>
                  <th>No Negative Comments:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
              </tbody>
          </table>
          <table style={{margin: 'auto'}}>
            <thead>
              <tr>
                <th>Most Number of Blogs on 5/1/2022</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
              </tr>
            </tbody>
          </table>
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