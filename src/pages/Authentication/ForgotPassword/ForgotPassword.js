import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/firebase";


const { Title } = Typography;



const initialState = {
    email: ""
}


export default function ForgotPassword() {


    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (e) =>
        setState((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();

        let { email } = state;

        if (email < 5) {
            return window.toastify("Invalid email Address", "error");
        }


        console.log(email);

        setIsLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                return window.toastify("Password reset email sent!", "success");
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                console.error(error)
                return window.toastify("Something went wrong while sending email..", "error");
                // ..


            })
            .finally(() => {
                setIsLoading(false)
                setState(initialState)

            })


    };

    return (
        <>
            <div className="auth-form">
                <div className="form-container fr-ps">
                    <div className="logo-container">
                        Forgot Password
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" value={state.email} placeholder="Enter your email" onChange={handleChange} required />
                        </div>
                        <button className="form-submit-btn" type="submit">Send Email</button>
                    </form>
                    <p className="signup-link">
                        Don't have an account?
                        <Link to="/authentication/register" >Register Now</Link>
                    </p>
                </div>

            </div>
        </>
    );
}
