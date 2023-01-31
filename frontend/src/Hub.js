import React from 'react';
import Navbar from "./components/hub/Navbar";
import WhatMovieSeeker from "./components/hub/WhatMovieSeeker";
import Features from "./components/hub/Features";
import Possibility from "./components/hub/Possibility";
import CTA from "./components/hub/CTA";
import Footer from "./components/hub/Footer";
import Header from "./components/hub/Header";


const Hub = () => {
    return (
            <div>
                <Navbar/>
                <Header/>
                <WhatMovieSeeker/>
                <Features/>
                <Possibility/>
                <CTA/>
                <Footer/>
            </div>
    );
}

export default Hub;