import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../components/Sidebar";
import Homeblogs from "../components/Homeblogs";
import Followings from "../components/Followings";
import Post from "../components/Post";
import BlogSelection from "../components/BlogsSelection";



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
  const [date, setDate] = useState(new Date('2022-04-13'));
  const [tagx, setTagx] = useState("X");
  const [tagy, setTagy] = useState("Y");
  const [postWindow, setPostWindow] = useState("hidden");
  const [blogSelection, setBlogSelection] = useState("hidden");
  const [postSuccess, setPostSuccess] = useState(false);
  const [BlogList,setBlogList] = useState([]);
  // const [darkenScreen, setDarkenScreen] = useState("hidden");
  // const [showPostWindow, setShowPostWindow] = useState("hidden");


  //Change this to update automatic
  // const Initialize = async () => {
  //   const res = await fetch("http://localhost:4000/api/initialize", {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   const data = await res.json();
  //   if(data.success) {
  //     console.log("initialize successful");
  //   } else {
  //     console.log("initialize failed");
  //   }
  // }

  // const showPostWindow = (visibility) => {

  //   setPostWindow(visibility);

  // }

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

    // useEffect(() => {
    //   const fetchNoNegativeCommentsOnPostList = async () => {
    //     const res = await fetch("http://localhost:4000/api/noNegativeCommentsOnPostList", {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const data = await res.json();
    //     if(data.blogs != null){
    //         console.log("No negative comments", data.blogs);
    //         setNoNegativeCommentsOnPostList(data.blogs);
    //     }
    //   }
    //   const fetchPostNegativeList = async () => {
    //     const res = await fetch("http://localhost:4000/api/postNegativeList", {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const data = await res.json();
    //     if(data.blogs != null){
    //         console.log("negative comments on posts", data.blogs);
    //         setPostNegativeList(data.blogs);
    //     }
    //   }
    //   const fetchNoCommentsList = async () => {
    //     const res = await fetch("http://localhost:4000/api/noCommentsList", {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const data = await res.json();
    //     if(data.blogs != null){
    //         console.log("No comments list", data.blogs);
    //         setNoCommentsList(data.blogs);
    //     }
    //   }
    //   const fetchNoBlogList = async () => {
    //     const res = await fetch("http://localhost:4000/api/noBlogList", {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const data = await res.json();
    //     if(data.blogs != null){
    //         console.log("No blog List", data.blogs);
    //         setNoBlogList(data.blogs);
    //     }
    //   }

    //   const fetchUserPairsWithSharedHobbiesList = async () => {
    //     const res = await fetch("http://localhost:4000/api/userPairsWithSharedHobbies", {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const data = await res.json();
    //     if(data.blogs != null){
    //         let seenHobby = [];
    //         let tmpList = {}
    //         // iterates through data.blogs and creates pairs of users with shared hobby
    //         for(const element of data.blogs){
    //             if(seenHobby.includes(element.hobby)){
    //                 // if hobby is already in seenHobby, then add the user to the tmp object
    //                 tmpList[element.hobby].push(element.user_id);
    //             } else {
    //                 // if hobby is not in seenHobby, then create a new object with the hobby as the key and the user as the value
    //                 tmpList[element.hobby] = [element.user_id];
    //                 seenHobby.push(element.hobby);
    //             }
    //         }
    //         let tmpUserPairsWithSharedHobbiesList = [];
    //         // iterate through tmpList and push each object to the userPairsWithSharedHobbiesList
    //         for(const element in tmpList){
    //           let tmp = {
    //             hobby: element,
    //             users: tmpList[element]
    //           };
    //           tmpUserPairsWithSharedHobbiesList.push(tmp);
    //         }
    //         console.log("USER Pairs With Shared Hobbies List", tmpUserPairsWithSharedHobbiesList);
    //         setUserPairsWithSharedHobbiesList(tmpUserPairsWithSharedHobbiesList);
    //     }
    //   }

    //   fetchUserPairsWithSharedHobbiesList();
    //   fetchOneXOneYList();
    //   fetchNoBlogList();
    //   fetchNoCommentsList();
    //   fetchPostNegativeList();
    //   fetchNoNegativeCommentsOnPostList();
    //   fetchMaxPostOnDateList(null);
    // }, [])

    // const fetchOneXOneYList = async () => {
    //   const res = await fetch("http://localhost:4000/api/oneXOneYList", {
    //       method: "POST",
    //       headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         tagx: tagx,
    //         tagy: tagy,
    //       })
    //   })
    //   const data = await res.json();
    //   if(data.blogs != null){
    //     console.log("One X One Y List", data.blogs);
    //     setOneXOneYList(data.blogs);
    //   }
    // }

    // const fetchMaxPostOnDateList = async (date) => {
    //   const res = await fetch("http://localhost:4000/api/maxPostOnDateList", {
    //       method: "POST",
    //       headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         date: date
    //       })
    //   })
    //   const data = await res.json();
    //   if(data.blogs != null){
    //       console.log("Max post on date list", data.blogs);
    //       setMaxPostOnDateList(data.blogs);
    //   }
    // }

    //Paste this over Hobby page
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
  // function dateFunction(date) {
  //   let tmpDate = date.toLocaleDateString('en-ZA').toString()
  //   setDate(date);
  //   fetchMaxPostOnDateList(tmpDate);
  // }
    return (
      <div className="default">
        { authenticated ?

        <div>
          <Post postWindow = {postWindow} showPostWindow={setPostWindow} fetchpost={fetchpost}/>
          <BlogSelection blogSelection={blogSelection} setBlogSelection={setBlogSelection}/> 
          <div className="three-way-grid">
            <Sidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} showPostWindow={setPostWindow} />
            {/* <div className="right-grids"> */}
              <Homeblogs user = {user} setBlogSelection={setBlogSelection} BlogList={BlogList}/>
              <Followings user={user} />
            {/* </div> */}
            {/* <button onClick={logout}>Logout</button> */}
          </div>
        </div>

          // <div>
          //   <h1>Welcome, {user?.firstName} </h1>
          //   <button onClick={logout}>Logout</button>
          //   <button onClick={Initialize}>Initialize Database</button>
          //   <button><Link to='/new-blog'>Create Blog Post</Link></button>
          //   <button><Link to='/blogs'>All Blogs</Link></button>
          //   <button><Link to='/user-blogs'>Search Blogs</Link></button>
          //   <button><Link to='/mutual-followers'>Search Mutual Followers</Link></button>
          //   <br/>
          //   <br/>
          //   <h3>Hobbies</h3>
          //   <form style={{margin: '0'}} onSubmit={postHobby}>
          //       <div style={{width: '42%', margin:'0 auto', display: 'flex',}} >
          //       <input type="text" placeholder="Hobby"  value={HobbyList} id="hobby" onChange={(e) => {setHobbyList(e.target.value)}}/>
          //       </div>
          //       <button>Add Hobby</button>
          //   </form>
            
          //   <h3 style={{marginTop: '20px'}}>Users</h3>
          //   <div style={{ margin: '0 auto', width: '52%'}}>
          //     <h5 style={{background: 'gray'}}>Users With No Blogs:</h5>
          //     {noBlogList.map((blog, i) => (
          //         <div key={i}>
          //           {blog.username ?
          //           <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
          //           : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
          //           }
          //         </div>
          //     ))}

          //     <h5 style={{background: 'gray'}}>Users With No Comments:</h5>
          //     {noCommentsList.map((blog, i) => (
          //         <div key={i}>
          //           {blog.username ?
          //           <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
          //           : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
          //           }
          //         </div>
          //     ))}

          //     <h5 style={{background: 'gray'}}>Users Who Post Negative Comments:</h5>
          //     {postNegativeList.map((blog, i) => (
          //         <div key={i}>
          //         {blog.username ?
          //           <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
          //           : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
          //           }
          //         </div>
          //     ))}

          //     <h5 style={{background: 'gray'}}>Users With No Negative Comments on there Posts:</h5>
          //     {noNegativeCommentsOnPostList.map((blog, i) => (
          //         <div key={i}>
          //           {blog.username ?
          //           <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
          //           : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
          //           }
          //         </div>
          //     ))}

          //     <h5 style={{background: 'gray'}}>Users With Most Number of Blogs on {date.toLocaleDateString('en-ZA').toString()}</h5>
          //     <DatePicker selected={date} onChange={date => dateFunction(date)} />
          //     {maxPostOnDateList.map((blog, i) => (
          //         <div key={i}>
          //             {blog.username ?
          //                 <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
          //                 : <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>
          //             }
          //       </div>
          //     ))}

          //     <h5 style={{background: 'gray'}}>Search users With Two Blogs, Atleast One X & Y tag</h5>
          //     <form onSubmit={(e) => {e.preventDefault(); fetchOneXOneYList()}}>
          //       <input type="text" placeholder="Enter tag 1"  value={tagx} id="tagx" onChange={(e) => {setTagx(e.target.value)}}/>
          //       <input type="text" placeholder="Enter tag 2"  value={tagy} id="tagy" onChange={(e) => {setTagy(e.target.value)}}/>
          //       <button>Search</button>
          //     </form>
          //     {OneXOneYList.length > 0 && OneXOneYList.map((blog, i) => (
          //         <div key={i}>
          //             <h6 style={{background: 'white', margin: '10px auto'}}>{blog.username}</h6>
          //         </div>
          //     ))}
          //     {OneXOneYList.length === 0 && <h6 style={{background: 'white', margin: '10px auto'}}>NONE</h6>}

          //     <h5 style={{background: 'gray'}}>User Pairs With At Least One Shared Hobbies</h5>
          //     {userPairsWithSharedHobbiesList.map((hobby, i) => (
          //         <div key={i}>
          //             <h6 style={{background: 'black', margin: '10px auto', color: 'white'}}>HOBBY: {hobby.hobby}</h6>
          //             <div style={{display: 'flex'}} key={i}>
          //               {hobby.users.map((user, i) => (
          //                 <h6 style={{background: 'white', margin: '10px auto', padding: '5px 10px'}} key={i}>{user}</h6>
          //               ))}
          //             </div>
          //         </div>
          //     ))}
          //   </div>        
          // </div>
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