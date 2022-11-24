import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
// import PostiveBlogs from './UserBlogs';


const Blogs = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();
    const [BlogList,setBlogList] = useState([]);
    const [follower, setFollower] = useState(null);

    useEffect(() => {
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
                console.log(data.blogs);
                setBlogList(data.blogs);
            }
        }
        fetchpost();

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
                setFollower(data.user.username);
                setAuthenticated(true);
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

    const followUser = async (followedUser) => {
        console.log(follower + ' will now follow ' + followedUser);

        //follower MUST NOT follow itself
        if (follower != followedUser) {
            const res = await fetch("http://localhost:4000/api/follow", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followedUser: followedUser,
                    follower: follower
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

    return (
        <div>
            {console.log(BlogList)}
            {BlogList.map((blog,i) => {
                return (
                    <div className="carta" key={i}>
                    {/* <button onClick={() => followUser(blog.user_id)}>Follow</button> */}
                        <div className="carta-body">
                            <h5 className="carta-title" style={{fontWeight: 'bold'}}>{blog.subject}</h5>
                            <h6 className="carta-subtitle" style={{color: 'red'}}>by {blog.user_id}</h6>
                            <p className="carta-text">{blog.description}</p>
                            <div className='carta-bottom'>
                                <p className="carta-text" onClick={() => {history.push(`/blog/:${blog.id}`, {props: {user_id: blog.user_id, subject: blog.subject, description: blog.description, tags: blog.tags}})}}>Comments</p>
                                <p className="carta-text">Likes</p>
                                <p className="carta-text">Disikes</p>
                                <p className="carta-text">Tags: {blog.tags}</p>
                                {/* <button onClick={() => {history.push(`/blog/:${blog.id}`, {state: {user_id: blog.user_id, subject: blog.subject, description: blog.description, tags: blog.tags}})}}>Comments</button> */}
                            </div>
                            
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Blogs