import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Blogs from "./Blogs";
import UserIcon from "../assets/person-circle.svg";
import NotFound from "./NotFound";

function ProfileDisplay(props) { 

    // const [follower, setFollower] = useState(null);
    const location = useLocation();
    const { pathname } = location;
    const [userProfile, setUserProfile] = useState(null);
    const [userHobbies, setUserHobbies] = useState(null);
    const [followingUsers, setFollowingUsers] = useState(0);
    const [userFollowers, setUserFollowers] = useState(0);
    const [blogCount, setBlogCount] = useState(0);

    const getFollowings = async (username) => {
        // e.preventDefault();
        const res = await fetch(`http://localhost:4000/api/${pathname.split("/")[2]}/followings`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            // , body: JSON.stringify({
            //     follower: username
            // }),
        })
        const data = await res.json();
        if(data.success) {
            // alert("Getting information over the console...");
            console.log(data.followings);
            setFollowingUsers(data.followings.length);
            // setUserProfile(data.profileInfo[0]);
            // setUserHobbies(data.hobbies);
        } else {
            alert(data?.err);
            console.log(data.err);
        }
    }

    const getFollowers = async (username) => {
        // e.preventDefault();
        const res = await fetch(`http://localhost:4000/api/${pathname.split("/")[2]}/followers`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            // , body: JSON.stringify({
            //     follower: username
            // }),
        })
        const data = await res.json();
        if(data.success) {
            // alert("Getting information over the console...");
            console.log(data.followers);
            setUserFollowers(data.followers.length);
            // setUserProfile(data.profileInfo[0]);
            // setUserHobbies(data.hobbies);
        } else {
            alert(data?.err);
            console.log(data.err);
        }
    }

    const followUser = async (followedUser) => {
        console.log(props.follower + ' will now follow ' + followedUser);

        //follower MUST NOT follow itself
        if (props.follower != followedUser) {
            const res = await fetch("http://localhost:4000/api/follow", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followedUser: followedUser,
                    follower: props.follower
                }),
            })
            const data = await res.json();
            if(data.success === true){
                alert("Followed successfully");
                console.log('successfully followed the user');
            }
            else{
                alert(data?.err);
            }

        } else {
            alert("You cannot follow yourself");
            console.log('following oneself is not permitted');
        }
    }

    const getUser = async (e) => {
        // e.preventDefault();
        const res = await fetch(`http://localhost:4000/api/profile/${pathname.split("/")[2]}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        if(data.success) {
            // console.log("Getting information from getUser...");
            // console.log(data.profileInfo);
            // console.log(data.hobbies);
            // console.log(data.blogs_count[0].blogs_count);
            setUserProfile(data.profileInfo[0]);
            setUserHobbies(data.hobbies);
            setBlogCount(data.blogs_count[0].blogs_count);
        } else {
            alert(data?.err);
            console.log(data.err);
        }
    }

    useEffect(() => {
        getUser();
        getFollowings();
        getFollowers();
    }, []);

    return (
        (userProfile && userHobbies) ? 
            <div className="column main-display">
                <div className="main-content">
                    <div className="main-header">
                        <h1>{userProfile.first_name} {userProfile.last_name}</h1>
                    </div>
                    <div className="profile-header">
                        <div className="profile-header-body">
                            <div className="profile-header-image">
                                {/* <p>image here</p> */}
                                <img src={UserIcon}></img>
                            </div>
                            <div className="profile-header-text">
                                <div className="profile-header-top">
                                    <h4>{userProfile.first_name} {userProfile.last_name}</h4>
                                    {/* <p>follow button</p> */}
                                    <button className="follow-button" style={userProfile.username === props.user.username ? {visibility: "hidden"} : {visibility: "visible"}} onClick={() => followUser(userProfile.username)}>Follow</button>
                                </div>
                                <div className="hobby-list">
                                    <p>Hobbies:</p>
                                    {userHobbies.map((e)=> {
                                        return (
                                            <p>{e.hobby}</p>
                                        );
                                    })}
                                </div>
                                <div className="profile-header-follows">
                                    <p>{blogCount} Blogs</p>
                                    <p>{userFollowers} Followers</p>
                                    <p>{followingUsers} Following</p>
                                    {/* <p>0 Mutual Followers</p> */}
                                </div>
                            </div>
                        </div>
                    </div>  
                    <Blogs BlogList={props.BlogList}/>  
                </div>
            </div>
        :
        <NotFound />
    );

}

export default ProfileDisplay;