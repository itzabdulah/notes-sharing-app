import React from 'react'
import logo from '../../../Assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';

export default function Hero() {
    const navigate = useNavigate();
    const { isAuthenticated, dispatch } = useAuthContext()

    return (
        <>
            <section className="hero container-fluid mt-1 mb-3">
                <div className="hero-content">
                    <h1>Welcome to Notes Zone By <b>Abdullah</b></h1>
                    <button
                        className="my-3 btn"
                        onClick={() => {
                            !isAuthenticated ?
                            navigate("/authentication/login") : navigate('/dashboard')
                        }}
                    >
                        Start Learning
                    </button>
                </div>
                <div className="hero-image">
                    <img src={logo}
                        alt="Boy listening to music" />
                </div>
            </section>
            
        </>
    )
}
