import React from "react";
import { useEffect, useState } from "react";


function Login() {

  // const [username, setUsername] = useState("");
  // const [password,setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    console.log("checking username and password entered");
    console.log(u, p);

    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: u,
        password: p
      }),
    })
    const data = await res.json();
    console.log(data);
  }


    // useEffect(() => {
        
    // });

    return (
      <div className="SignOrReg">
        <div className="form-title">
            <h2>Log In</h2>
        </div>
        <form onSubmit={signIn}>
            <label>Username</label>
            <input type="text" id="username"></input>
            <label>Password</label>
            <input type="password" id="password"></input>
            <button type="submit">Submit</button>
        </form>
        <a href="/register"><p>Not registered? Sign up.</p></a>
      </div>
    );
}
  
export default Login;