import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


function Login() {

  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");

  const history = useHistory();

  const signIn = async (e) => {
    e.preventDefault();

    console.log("checking email and password entered");
    console.log(email, password);

    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
    const data = await res.json();
    if(data.success) {
      console.log("login successful");
      // localStorage.setItem("username", username);
      history.push("/userpage");
    }
  }


    // useEffect(() => {
        
    // });

    return (
      <div className="SignOrReg">
        <div className="form-title">
            <h2>Log In</h2>
        </div>
        <form onSubmit={signIn}>
            <label>Email</label>
            <input type="text" id="username" onChange={(e) => {setEmail(e.target.value)}}></input>
            <label>Password</label>
            <input type="password" id="password" onChange={(e) => {setPassword(e.target.value)}}></input>
            <button type="submit">Submit</button>
        </form>
        <a href="/register"><p>Not registered? Sign up.</p></a>
      </div>
    );
}
  
export default Login;