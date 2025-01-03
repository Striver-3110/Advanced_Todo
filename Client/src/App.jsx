import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Login from './components/Login';
// import Signup from './components/Signup';
import TodoApp from './components/TodoApp'
function App () {
  return (
    <main className='flex justify-center items-center gap-4 flex-col min-h-screen m-0 p-0'>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
          <Route path='/' element={<TodoApp />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
