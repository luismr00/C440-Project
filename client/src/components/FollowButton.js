import React, { useEffect, useState } from "react";
// import { useLocation } from 'react-router-dom';


function FollowButton(props) {

    // const location = useLocation();
    // const { pathname } = location;
    const [followed, setFollowed] = useState(null);

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
                    followedUser: followedUser
                    // follower: props.follower
                }),
            })
            const data = await res.json();
            if(data.success === true){
                alert("Followed successfully");
                console.log('successfully followed the user');
                followStatus();
            }
            else{
                alert(data?.err);
            }

        } else {
            alert("You cannot follow yourself");
            console.log('following oneself is not permitted');
        }
    }

    const unfollowUser = async () => {
        const res = await fetch("http://localhost:4000/api/unfollow", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                follow_id: followed
            }),
        })
        const data = await res.json();
        if(data.success === true){
            alert("Unfollowed successfully");
            console.log("Unfollowed successfully");
            setFollowed(null);
        }
        else{
            alert(data?.err);
        }
    }

    const followStatus = async () => {
        const res = await fetch("http://localhost:4000/api/followed", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                followed: props.userProfile.username
            }),
        })
        const data = await res.json();
        if(data.success === true){
            console.log("Fetched following id for follow button requirements");
            console.log(data.follower_id)
            setFollowed(data.follower_id);
        }
        else{
            alert(data?.err);
        }
    }

    useEffect(() => {
        followStatus();
    }, [props.userProfile]);

    const handleFollow = (action) => {
        if(action === "follow") {
            followUser(props.userProfile.username)
        } else {
            unfollowUser(props.userProfile.username)
        }
    }

    return (
        followed != null ? 
            <button 
                className="unfollow-button" 
                style={props.userProfile.username === props.user.username ? {visibility: "hidden"} : {visibility: "visible"}} 
                onClick={() => handleFollow("unfollow")}>
                    Unfollow
            </button>
        :
            <button 
                className="follow-button" 
                style={props.userProfile.username === props.user.username ? {visibility: "hidden"} : {visibility: "visible"}} 
                onClick={() => handleFollow("follow")}>
                    Follow
            </button>
    );
}

export default FollowButton;