import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { auth, firestore } from "../../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { useAuthContext } from "../../../context/AuthContext";

const { Title } = Typography;


const initialState = {
  fullName: "",
  email: "",
  password: "",
  // confirmPassword: "",
};

export default function Register() {

  const { dispatch } = useAuthContext()
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    let { fullName, email, password } = state;
    if (fullName.length < 3) {
      return window.toastify("Please enter your full name correctly", "error");
    }
    if (email < 5) {
      return window.toastify("Invalid email Address", "error");
    }
    if (password.length < 5) {
      return window.toastify("Please enter strong Password", "error");
    }
    // if (confirmPassword !== password) { return window.toastify("Password doesn't match", "error") }
    console.log(fullName);
    console.log(email);
    console.log(password);

    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user)
        addDocument(user)
        window.toastify("A New User has Been successfully Registered ",
          "success")


      })
      .catch((error) => {
        console.error("error", error);
        switch (error.code) {
          case "auth/email-already-in-use":
            window.toastify("Email already in exist", "error");
            break;
          default:
            window.toastify("Something went wronge while adding new user");
            break;
        }

        setIsLoading(false)
      })
  };


  const addDocument = async (user) => {
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: "",
        lastName: "",
        uid: user.uid,
        // Add any other relevant user data here, like email, etc.
        // But avoid storing the entire user object.
      });
      window.toastify("A New User has Been successfully added at firestore ",
        "success")
      dispatch({ type: "LOGIN", payload: { user } })
    }
    catch (error) {
      console.error(error)
      window.toastify("Something went wrong while adding in firestore ",
        "error")
    }
    setState(initialState)
    setIsLoading(false)
  };




  return (
    <>
      <div className="auth-form">

        <div className="form-container">
          <p className="title">Register</p>
          <form className="form" onSubmit={handleSubmit}>
            <input type="text" className="input" placeholder="Your Full Name" value={state.fullName} name="fullName" onChange={handleChange} />
            <input type="email" className="input" placeholder="Email" name="email" value={state.email} onChange={handleChange} />
            <input type="password" className="input" placeholder="Password" name="password" value={state.password} onChange={handleChange} />

            <button className="form-btn">Register</button>
          </form>
          <p className="sign-up-label">
            Already have an account? <Link to="/authentication/login"> Login here</Link>
          </p>

        </div>
      </div>
    </>
  );
}

