import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";


const BlogPage = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();

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
        <>
        {authenticated ?
            <div>
                <h1>Blog Page</h1>
                <form>
                    <input type="text" placeholder="Subject" />
                    <input type="text" placeholder="Description" />
                    <input type="text" placeholder="Tags" />
                    <button type="submit">Submit</button>
                </form>
            </div>
            :
            <div>You are not logged in</div>
        }
        </>
    )
}

export default BlogPage