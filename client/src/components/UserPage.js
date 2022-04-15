import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";


function UserPage() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();
  const [noBlogList, setNoBlogList] = useState([]);
  const [noCommentsList, setNoCommentsList] = useState([]);
  const [postNegativeList, setPostNegativeList] = useState([]);
  const [noNegativeCommentsOnPostList, setNoNegativeCommentsOnPostList] = useState([]);
  const [maxPostOnDateList, setMaxPostOnDateList] = useState([]);
  const [HobbyList, setHobbyList] = useState("");
  const [OneXOneYList, setOneXOneYList] = useState([]);
  const [userPairsWithSharedHobbiesList, setUserPairsWithSharedHobbiesList] = useState([]);

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
            console.log("No negative comments", data.blogs);
            setNoNegativeCommentsOnPostList(data.blogs);
        }
      }
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
            console.log("negative comments on posts", data.blogs);
            setPostNegativeList(data.blogs);
        }
      }
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
            console.log("No comments list", data.blogs);
            setNoCommentsList(data.blogs);
        }
      }
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
            console.log("No blog List", data.blogs);
            setNoBlogList(data.blogs);
        }
      }
      const fetchMaxPostOnDateList = async () => {
        const res = await fetch("http://localhost:4000/api/maxPostOnDateList", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        if(data.blogs != null){
            console.log("Max post on date list", data.blogs);
            setMaxPostOnDateList(data.blogs);
        }
      }

      const fetchOneXOneYList = async () => {
        const res = await fetch("http://localhost:4000/api/oneXOneYList", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        if(data.blogs != null){
            console.log("One X One Y List", data.blogs);
            setOneXOneYList(data.blogs);
        }
      }

      const fetchUserPairsWithSharedHobbiesList = async () => {
        const res = await fetch("http://localhost:4000/api/userPairsWithSharedHobbies", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        if(data.blogs != null){
            console.log("User Pairs With Shared Hobbies List", data.blogs);
            let userPairsWithSharedHobbies = [];
            data.blogs.forEach(element => {
              let hobby = element.hobby;
              let tmpuser = element.user_id;
              let newHobby = { 
                hobby: {
                  users: [tmpuser],
                }
              };
              if(userPairsWithSharedHobbies[hobby] == null){
                userPairsWithSharedHobbies.push(newHobby);
                console.log("new hobby appeneded", userPairsWithSharedHobbies);
              }
            });
            console.log("hobbiiessss", userPairsWithSharedHobbiesList);
            setUserPairsWithSharedHobbiesList(userPairsWithSharedHobbiesList);
        }
      }

      fetchUserPairsWithSharedHobbiesList();
      fetchOneXOneYList();
      fetchNoBlogList();
      fetchNoCommentsList();
      fetchPostNegativeList();
      fetchNoNegativeCommentsOnPostList();
      fetchMaxPostOnDateList();
    }, [])


    const postHobby = async (e) => {
      e.preventDefault();
      const res = await fetch("http://localhost:4000/api/hobby", {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'credentials': 'include'
          },
          body: JSON.stringify({
                  hobby: HobbyList,
          }),
          }) 
          const data = await res.json();
          if(data.success) {
              console.log("create successful");
              alert("Hobby added successfully");
              setHobbyList("");
          } else {
              console.log("create failed");
          }
  }

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
            <form style={{margin: '0'}} onSubmit={postHobby}>
                <div style={{width: '42%', margin:'0 auto', display: 'flex',}} >
                <input type="text" placeholder="Hobby"  value={HobbyList} id="hobby" onChange={(e) => {setHobbyList(e.target.value)}}/>
                </div>
                <button>Add Hobby</button>
            </form>
            
            <h3 style={{marginTop: '20px'}}>Users</h3>
            <div style={{ margin: '0 auto', width: '52%'}}>
              <h5 style={{background: 'gray'}}>Users With No Blogs:</h5>
              {noBlogList.map((blog, i) => (
                  <div key={i}>
                    {blog.username ?
                    <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
                    : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
                    }
                  </div>
              ))}

              <h5 style={{background: 'gray'}}>Users With No Comments:</h5>
              {noCommentsList.map((blog, i) => (
                  <div key={i}>
                    {blog.username ?
                    <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
                    : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
                    }
                  </div>
              ))}

              <h5 style={{background: 'gray'}}>Users Who Post Negative Comments:</h5>
              {postNegativeList.map((blog, i) => (
                  <div key={i}>
                  {blog.username ?
                    <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
                    : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
                    }
                  </div>
              ))}

              <h5 style={{background: 'gray'}}>Users With No Negative Comments on there Posts:</h5>
              {noNegativeCommentsOnPostList.map((blog, i) => (
                  <div key={i}>
                    {blog.username ?
                    <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
                    : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
                    }
                  </div>
              ))}

              <h5 style={{background: 'gray'}}>Users With Most Number of Blogs on 04/12/2022</h5>
              {maxPostOnDateList.map((blog, i) => (
                  <div key={i}>
                      {blog.username ?
                          <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
                          : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
                      }
                </div>
              ))}

              <h5 style={{background: 'gray'}}>Users With Two Blogs and At Least One X and Y tag</h5>
              {OneXOneYList.map((blog, i) => (
                  <div key={i}>
                      {blog.username ?
                          <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
                          : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
                      }
                </div>
              ))}

              <h5 style={{background: 'gray'}}>User Pairs With At Least One Shared Hobbies</h5>
              {userPairsWithSharedHobbiesList.map((blog, i) => (
                  <div key={i}>
                      {blog.user_id ?
                          <h6 style={{background: 'white', margin: '10px auto'}}>{blog.user_id} {blog.hobby}</h6>
                          : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
                      }
                </div>
              ))}

              

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
  
export default UserPage;