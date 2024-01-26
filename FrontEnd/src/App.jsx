import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Logpage from './JSX FILE/logpage'
import Dashboard from './JSX FILE/dashboard'
import { HashRouter, Routes, Route } from "react-router-dom";
function App() {
  

  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Logpage />}>
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
        </Route>
      </Routes>
    </HashRouter>
      {/* <div className=' min-h-screen bg-slate-900' id='log-host'>
        <Logpage />
        
      </div> */}
    </>
  )
}

export default App
