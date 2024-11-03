import React from 'react'
import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import Topbar from "../../components/Header/Topbar"
import Todos from './Todos'
import Navbar from '../../components/Header/Navbar'
import Footer from '../../components/Footer'

export default function index() {
    return (
        <>
            <Topbar />
            <Navbar />
            <Routes>
                <Route index element={<Home />} />
                <Route path='/notes' element={<Todos />} />
            </Routes>
            <Footer />
        </>

    )
}
