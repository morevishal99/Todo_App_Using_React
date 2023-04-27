import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Todo from '../Component/Todo'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'

const Allroutes = () => {
    return (
        <>
            <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Signup/>} />
            <Route path='/todo' element={<Todo/>} />
               
            </Routes>
        </>
    )
}

export default Allroutes