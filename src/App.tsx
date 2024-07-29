

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Watch from './pages/Watch'
import Search from './pages/Search'
export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/search' element={<Search/>}/>
    <Route path='/watch/:id' element={<Watch/>}/>
    <Route path='/' element={<Home/>}/>
   </Routes>
   </BrowserRouter>
  )
}

