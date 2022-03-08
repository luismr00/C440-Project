import React from "react";
import { useEffect, useState } from "react";


function Login() {

  const signIn = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@gmail.com',
        password: 'password'
      }),
    })
    const data = await res.json();
    console.log(data);
  }


    // useEffect(() => {
        
    // });

    return (
      <div className="LogIn">
          <form onSubmit={signIn}>
              <fieldset>Username</fieldset>
              <input type="text"></input>
              <fieldset>Password</fieldset>
              <input type="password"></input>
              <button type="submit">Submit</button>
          </form>
      </div>
    );
}
  
export default Login;