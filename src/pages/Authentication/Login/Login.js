import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


const { Title } = Typography;

const initialState = {

  email: "",
  password: "",
  // confirmPassword: "",
};



export default function Login() {


  const navigate = useNavigate()
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    let { email, password } = state;

    if (email < 5) {
      return window.toastify("Invalid email Address", "error");
    }
    if (password.length < 5) {
      return window.toastify("Please enter strong Password", "error");
    }
    // if (confirmPassword !== password) { return window.toastify("Password doesn't match", "error") }


    console.log(email);
    console.log(password);

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user)
        window.toastify("Sucessfully Logged in", "success")
        navigate("/dashboard")

        // ...
      })
      .catch((error) => {
        console.log("Error", error)
        switch (error.code) {
          case "auth/invalid-credential":
            return window.toastify("Invalid User name or Password", "error")
          default:
            window.toastify("Something went wronge while logging in")
            break;
        }

      })
      .finally(() => {
        setIsLoading(false)
        setState(initialState)

      })


  };

  return (
    <>
      <div className="auth-form">

        <div className="form-container ">
          <p className="title">Login</p>
          <form className="form" onSubmit={handleSubmit}>
            <input type="email" className="input" placeholder="Email" value={state.email} name="email" onChange={handleChange} />
            <input type="password" className="input" placeholder="Password" value={state.password} name="password" onChange={handleChange} />
            <p className="page-link">
              <span className="page-link-label"><Link to="/authentication/forgot-password" >Forgot Password?</Link></span>
            </p>
            <button className="form-btn" >Login</button>
          </form>
          <p className="sign-up-label">
            Don't have an account? <Link to="/authentication/register"> Register here</Link>
          </p>

        </div>
      </div>
    </>
  );
}
