import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from './Home/Hero'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import About from './About/'
import Contact from './Contact/'

export default function Frontend() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route index element={<Hero />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
