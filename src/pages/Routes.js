import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Authentication from './Authentication'
import Dashboard from './Dashboard'
import { useAuthContext } from '../context/AuthContext'
import PrivatRoute from '../components/PrivatRoute'

export default function Index() {
    const { isAuthenticated, user } = useAuthContext()

    console.log("isAuthenticated", isAuthenticated)
    console.log("user", user)

    return (
        <Routes>
            <Route path='/*' element={<Frontend />} />
            <Route path="/authentication/*" element={!isAuthenticated ? <Authentication /> : <Navigate to="/" />} />
            <Route path='/dashboard/*' element={<PrivatRoute Component={Dashboard} />} />
            {/* <Route path="authentication/*" element={<Authentication />} />
            <Route path='/dashboard/*' element={<Dashboard />} /> */}
        </Routes>
    )
}
