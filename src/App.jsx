import React from 'react'
import Login from './components/login/Login'
import { Route, Routes } from 'react-router-dom'
import Task from './components/task/Task'

export default function App() {
  return (
    <>

<Routes>
  <Route exact path='/' element={<Login/>}></Route>
  <Route exact path='/task' element={<Task/>}></Route>
</Routes>

    </>
  )
}

