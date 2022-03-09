import React from "react";
import { useEffect, useState } from "react";


function Register() {

  const signup = async (e) => {
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
      <div className="SignOrReg">
        <div className="form-title">
            <h2>Register</h2>
        </div>
        <form onSubmit={signup}>
            <label>Username</label>
            <input type="text"></input>
            <label>Password</label>
            <input type="password"></input>
            <label>First Name</label>
            <input type="text"></input>
            <label>Last Name</label>
            <input type="text"></input>
            <label>Email</label>
            <input type="text"></input>
            <button type="submit">Submit</button>
        </form>
        <a href="/"><p>Registered already? Sign in.</p></a>
      </div>
    );
}
  
export default Register;