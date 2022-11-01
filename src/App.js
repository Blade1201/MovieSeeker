import React from 'react'
import './styles/style.css'
import Navbar from "./components/Navbar";
import Authentication from "./authentication/Authentication";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";





function App() {
  

  return (
    <div className="App">

      <BrowserRouter>
          <Routes>

              <Route path="/" element={<Navbar/>}/>

              <Route path="/authentication" element={<Authentication/>}/>

          </Routes>

      </BrowserRouter>

    </div>
  )
}


export default App;