import React, { useState } from 'react'
import { setDoc, serverTimestamp, doc } from 'firebase/firestore/lite'
import { Link } from 'react-router-dom'
import { Col, Typography } from 'antd'
import { firestore } from '../../config/firebase'
import { useAuthContext } from '../../context/AuthContext'



const { Title } = Typography

const initialState = {
    name: "",
    email: "",
    description: ""
}

export default function Todos() {

    const { user } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setState((s) => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // setIsLoading(true)

        let { name, email, description } = state
        name = name.trim()
        email = email.trim()
        description = description.trim()

        if (name.length < 3) {
            return window.toastify("name must b at least 3 char.", "error");
        }
        if (email.length < 5) {
            return window.toastify("please enter ur email correctly", "error");
        }
        if (description.length < 10) {
            return window.toastify("enter a description correctly ", "error");
        }

        let formData = { name, email, description }

        formData.dateCreated = serverTimestamp()
        formData.id = window.getRandomId()
        formData.subject = "CS"
        formData.createdBy = {
            email: user.email,
            uid: user.uid
        }
        creatDocument(formData)

    }
    const creatDocument = async (formData) => {
        setIsLoading(true)
        try {
            await setDoc(doc(firestore, "todos", formData.id), formData);
            window.toastify("Notes has been successfully added ", "success");
        }
        catch (err) {
            console.log(err)
            window.toastify("Something went wrong while adding Notes", "error");
        }
        setIsLoading(false)
        setState(initialState)
    }

    return (


        <div className="Add-form">

            <div className="form-container-fluid add-item" >
                <p className="title">Add Notes</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="text" className="input" placeholder="Enter your name" name="name" onChange={handleChange} value={state.name} />
                    <input type="email" className="input" placeholder="Enter Email"
                        name="email" value={state.email} onChange={handleChange} />
                    <textarea
                        className='form-control'
                        rows={5}
                        placeholder="Enter Description"
                        name="description"
                        onChange={handleChange}
                    />
                    <Col span={[24]}>
                        <select name="subject" className='form-control text-center' onChange={handleChange}>
                            <option value="Chemistry">Chemistry</option>
                            <option value="physics">physics</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Economics">Economics</option>
                        </select>
                    </Col>
                    <div className="btnn-add">

                        <button style={{ maxWidth: "500px", }} className="form-btn ">Add to Notes</button>
                    </div>
                </form>
                <p className='text-center' >
                    Want to read Our Notes <Link to="/dashboard"> click here</Link>
                </p>

            </div>
        </div>

    )
}
