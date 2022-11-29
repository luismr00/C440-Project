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
  const [BlogListALL,setBlogListALL] = useState([]);
  const [BlogListNC, setBlogListNC] = useState([]);
  const [BlogListMPR,setBlogListMPR] = useState([]);
  const [BlogListMNR,setBlogListMNR] = useState([]);
  const [BlogListOPR,setBlogListOPR] = useState([]);
  const [blogListHobbies, setBlogListHobbies] = useState([]);
  

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
        setBlogListALL(data.blogs);
    }
  }

  const fetchpostNC = async () => {
    const res = await fetch("http://localhost:4000/api/blogsNC", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        console.log(data.blogs);
        setBlogListNC(data.blogs);
    }
  }

  const fetchpostMPR = async () => {
    const res = await fetch("http://localhost:4000/api/blogsMPR", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        console.log(data.blogs);
        setBlogListMPR(data.blogs);
    }
  }

  const fetchpostMNR = async () => {
    const res = await fetch("http://localhost:4000/api/blogsMNR", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        console.log(data.blogs);
        setBlogListMNR(data.blogs);
    }
  }

  const fetchpostOPR = async () => {
    const res = await fetch("http://localhost:4000/api/blogsOPR", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        console.log(data.blogs);
        setBlogListOPR(data.blogs);
    }
  }

  const fetchpostHobbies = async () => {
    const res = await fetch("http://localhost:4000/api/hobbyBlogs", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json();
    if(data.blogs != null){
        console.log(data.blogs);
        setBlogListHobbies(data.blogs);
    }
  }

  useEffect(() => {
    fetchpost();
    fetchpostNC();
    fetchpostMPR();
    fetchpostMNR();
    fetchpostOPR();
    fetchpostHobbies();
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

    return (
      <div className="default">
        { authenticated ?

          <div>
            <Post postWindow = {postWindow} showPostWindow={setPostWindow} fetchpost={fetchpost}/>
            <BlogSelection 
              blogSelection={blogSelection} 
              setBlogSelection={setBlogSelection}
              setBlogList={setBlogList}
              BlogListALL={BlogListALL}
              BlogListNC={BlogListNC}
              BlogListMPR={BlogListMPR}
              BlogListMNR={BlogListMNR}
              BlogListOPR={BlogListOPR}
              BlogListHobbies={blogListHobbies}
            /> 
            <div className="three-way-grid">
              <Sidebar user={user} setAuthenticated={setAuthenticated} setUser={setUser} showPostWindow={setPostWindow} />
              <Homeblogs user = {user} setBlogSelection={setBlogSelection} BlogList={BlogList}/>
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
  
export default UserPage;