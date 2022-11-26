import React from 'react';
import Home from "./components/Home";
import Authentication from "./authentication/Authentication";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Hub from "./Hub";
import About from "./components/About";



const App = () => {
  

  return (
    <div className = "App">

        <BrowserRouter>

          <Routes>

              <Route path = "/" element = { <Hub/> }/>

              <Route path = "/about" element = { <About/> }/>

              <Route path = "/search" element = { <Home/> }/>

              <Route path = "/authentication" element = { <Authentication/> }/>

          </Routes>

      </BrowserRouter>

    </div>
  );
};


export default App;