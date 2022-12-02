import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import UserIcon from "../assets/person-circle.svg";

function Followings(props) { 

    const [followingUsers, setFollowingUsers] = useState([]);
    const history = useHistory();

    const getFollowings = async (username) => {
        // e.preventDefault();
        const res = await fetch(`http://localhost:4000/api/${username}/followings`, {
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
            setFollowingUsers(data.followings);
            // setUserProfile(data.profileInfo[0]);
            // setUserHobbies(data.hobbies);
        } else {
            alert(data?.err);
            console.log(data.err);
        }
    }

    useEffect(() => {
        getFollowings(props.user.username);
    }, []);

    return (
        <div className="column">
            <div className="following">
                <div className="following-header">
                    <h1>Following</h1>
                </div>

                {followingUsers.length === 0 ? 
                    <div className="user-bar">
                        <p>You are not following anybody at this time</p>
                    </div>
                    :
                    followingUsers.map((following) => {
                        return(
                            <div className="user-bar" onClick={() => {history.push(`/${following.username}`)}}>
                                <img src={UserIcon}></img>
                                <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>{following.first_name} {following.last_name}</p>
                            </div>
                        );
                    })
                }

                {/* {followingUsers.map((u) => {
                    return(
                        <div className="user-bar">
                            <img src={UserIcon}></img>
                            <p style={{fontSize: '20px', margin: '8px 0 0 15px'}}>Joseph Marquez</p>
                        </div>
                    );
                })} */}
            </div>
        </div>
    );

}

export default Followings;