import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";


function UserPage() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [noBlogList, setNoBlogList] = useState([]);
  const [noCommentsList, setNoCommentsList] = useState([]);
  const [postNegativeList, setPostNegativeList] = useState([]);
  const [noNegativeCommentsOnPostList, setNoNegativeCommentsOnPostList] = useState([]);

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

  useEffect(() => {
    const fetchNoBlogList = async () => {
        const res = await fetch("http://localhost:4000/api/noBlogList", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        if(data.blogs != null){
            console.log(data.blogs);
            setNoBlogList(data.blogs);
        }
    }
    fetchNoBlogList();

}, []);

  useEffect(() => {
    const fetchNoCommentsList = async () => {
        const res = await fetch("http://localhost:4000/api/noCommentsList", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        if(data.blogs != null){
            console.log(data.blogs);
            setNoCommentsList(data.blogs);
        }
    }
    fetchNoCommentsList();

}, []);

useEffect(() => {
    const fetchPostNegativeList = async () => {
        const res = await fetch("http://localhost:4000/api/postNegativeList", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        if(data.blogs != null){
            console.log(data.blogs);
            setPostNegativeList(data.blogs);
        }
    }
    fetchPostNegativeList();

});

useEffect(() => {
    const fetchNoNegativeCommentsOnPostList = async () => {
        const res = await fetch("http://localhost:4000/api/noNegativeCommentsOnPostList", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        if(data.blogs != null){
            console.log(data.blogs);
            setNoNegativeCommentsOnPostList(data.blogs);
        }
    }
    fetchNoNegativeCommentsOnPostList();

});

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
            <table style={{ margin: 'auto'}}>
              <thead>
                <tr>
                  <th style={{backgroundColor: 'gray'}}>Users With No Blogs:</th>
                  </tr>
              </thead>
              <tbody>
                {noBlogList.map((blog) => {
                  <tr>
                  <td style={{backgroundColor: 'white'}}>{blog.blogs}</td>
                  </tr>
                })}
              </tbody>
              <br/>
              <table style={{ margin: 'auto'}}>
              <thead>
                <tr>
                  <th style={{backgroundColor: 'gray'}}>Users With No Comments:</th>
                  </tr>
              </thead>
              <tbody>
                {noCommentsList.map((blog) => {
                <tr>
                  <td style={{backgroundColor: 'white'}}>{blog.blogs}</td>
                  </tr>
                })}
              </tbody>
              </table>
              <br/>
              <table style={{ margin: 'auto'}}>
              <thead>
                <tr>
                  <th style={{backgroundColor: 'gray'}}>Users Who Post Negative Comments:</th>
                  </tr>
              </thead>
              <tbody>
                {postNegativeList.map((blog) => {
                <tr>
                  <td style={{backgroundColor: 'white'}}>{blog.blogs}</td>
                  </tr>
                  })}
              </tbody>
              </table>
              <br/>

              <table style={{ margin: 'auto'}}></table>
              <thead>
                <tr>
                  <th style={{backgroundColor: 'gray'}}>Users With Post No Negative Comments:</th>
                </tr>
              </thead>
              <tbody>
              {noNegativeCommentsOnPostList.map((blog) => {
                <tr>
                  <td style={{backgroundColor: 'white'}}>{blog.blogs}</td>
                  </tr>
              })}
              </tbody>
            </table>
          <br />
          <br />
          <table style={{margin: 'auto'}}>
            <thead>
              <tr>
                <th style={{backgroundColor: 'gray'}}>User With Most Number of Blogs on 5/1/2022</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{backgroundColor: 'white'}}>todo</td>
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