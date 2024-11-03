import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'

export default function About() {

  const { user } = useAuthContext()
  return (

    <>
      <h1 className="text-center py-5 ">WElcome to About Page.</h1>
      <h1 className="text-center py-5 ">My Email : {user.email}</h1>
    </>
  )
}
