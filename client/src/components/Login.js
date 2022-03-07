import React from "react";
import { useEffect, useState } from "react";


function Login() {

    const signIn = () => {
        fetch("http://localhost:4000/signed", {
            method: "POST",
            body: JSON.stringify({
              username: 'test',
              password: 123
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              return res.json();
            })
            // .then((data) => {
            //   console.log(data);
            // });
    }


    // useEffect(() => {
        
    // });

    return (
      <div className="LogIn">
          <form>
              <fieldset>Username</fieldset>
              <input type="text"></input>
              <fieldset>Password</fieldset>
              <input type="password"></input>
              <button onClick={signIn()}>Submit</button>
          </form>
      </div>
    );
  }
  
  export default Login;