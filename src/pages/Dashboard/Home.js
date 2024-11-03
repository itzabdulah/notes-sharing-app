import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { firestore } from '../../config/firebase'
import { useAuthContext } from '../../context/AuthContext'

const { Title } = Typography


export default function Todo() {

    const { user } = useAuthContext()
    const [documents, setDocuments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isProccessing, setIsProccessing] = useState(false)
    const [todo, setTodo] = useState({})

    const handleChange = (e) => {
        setTodo((s) => ({ ...s, [e.target.name]: e.target.value }))
    }


    const fetchDocument = async () => {

        let array = []


        const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            array.push(doc.data())
        });
        setDocuments(array)
        setIsLoading(false)
    }




    useEffect(() => {
        fetchDocument()
    }, [])




    const handleUpdate = async () => {
        console.log(todo)
        let formData = { ...todo }
        formData.dateModified = serverTimestamp()
        formData.modifiedBy = {
            email: user.email,
            uid: user.uid
        }
        setIsLoading(true)
        try {
            await setDoc(doc(firestore, "todos", formData.id), formData, { merge: true });
            let newDocuments = documents.map((doc) => {
                if (doc.id === todo.id)
                    return todo
                return doc
            })
            setDocuments(newDocuments)
            window.toastify("Todo has been successfully updated ", "success");

        } catch (err) {
            console.error(err)
            window.toastify("Something Went wrong while updatinf this todo ", "error");
        }
        setIsLoading(false)
    }

    const handleDelete = async (todo) => {
        console.log(todo)

        setIsProccessing(true)
        try {
            await deleteDoc(doc(firestore, "todos", todo.id));
            const newDocuments = documents.filter((doc) => {
                return doc.id !== todo.id
            })
            setDocuments(newDocuments)
            window.toastify("Todo has been successfully deleled ", "success")

        }

        catch (err) {
            console.error(err)
            window.toastify("Something went Wrong ", "error")
        }
        setIsProccessing(false)


    }

    return (

        <>
            <Title level={1} className="text-center text-white py-5">
                My Todos
            </Title>

            <main className="showTodos">
                <div className="card p-3 p-md-4 p-lg-5 ">
                    {!isLoading
                        ? <div>
                            <table className="table caption-top">
                                <caption>List of Notes</caption>
                                <thead>
                                    <tr>
                                        <th scope="col">Sr no.</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Email Address</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Subject Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((todo, i) => {
                                        return <tr key={i} >
                                            <th>{i + 1}</th>
                                            <td>{todo.name}</td>
                                            <td>{todo.email}</td>
                                            <td>{todo.description}</td>
                                            <td>{todo.subject}</td>
                                            <td>
                                                <Button type='primary' size='medium' className=' me-1 my-1' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { setTodo(todo) }} loading={isLoading}  >Edit</Button>
                                                <Button type='primary' size='medium' danger className=' btn-sm' onClick={() => { handleDelete(todo) }} loading={isProccessing} >Delete </Button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>

                            </table>
                        </div>

                        : <div className='text-center'><div className='spinner-grow'> </div></div>}


                </div>
            </main > :



            <div className="modal fade" id="editModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title text-center fs-5">Update Todo</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <Form layout="vertical">
                                <Row gutter={[16, 16]}>

                                    <Col span={[12]}>
                                        <Input
                                            size="large"
                                            type="text"
                                            placeholder="Enter Title"
                                            name="title"
                                            value={todo.name}
                                            onChange={handleChange}
                                        />
                                    </Col>

                                    <Col span={[12]}>
                                        <Input
                                            size="large"
                                            type="text"
                                            placeholder="Enter Location"
                                            name="location"
                                            value={todo.email}
                                            onChange={handleChange}
                                        />
                                    </Col>

                                    <Col span={[24]}>
                                        <textarea
                                            className='form-control'
                                            rows={5}
                                            placeholder="Enter Description"
                                            name="description"
                                            value={todo.description}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col span={[24]}>
                                        <select name="subject" className='form-control text-center' onChange={handleChange}>
                                            <option value="Chemistry">Chemistry</option>
                                            <option value="physics">physics</option>
                                            <option value="Computer Science">Computer Science</option>
                                            <option value="Economics">Economics</option>
                                        </select>
                                    </Col>

                                </Row>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdate}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
