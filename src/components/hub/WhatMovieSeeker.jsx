import React from 'react';
import Feature from './Feature';
import '../../styles/hub/whatMovieseeker.css';
import {Link} from "react-router-dom";



const WhatMovieSeeker = () => (

  <div className = "what-movieseeker section__margin" id = "movieseeker">

    <div className = "what-movieseeker-feature">
      <Feature title = "Mi is ez?" text = "Egy Single Page Application (SPA), amelyen rákereshetünk az általunk keresett tartalomra,
       és megtekinthetjük, hogy melyik streaming platformon érhető el az." />
    </div>


    <div className = "what-movieseeker-heading">
      <h1 className = "gradient__text"> A lehetőségek meghaladják a képzeleted </h1>
        <Link to = "/search"> Fedezd fel </Link>
    </div>


    <div className = "what-movieseeker-container">
      <Feature title = "Nézelődj" text = "Legyen az mozifilm esetleg tv sorozat, nálunk mindent megtalálhatsz" />
      <Feature title = "Böngéssz" text = "Számos tartalom közül válogathatsz kedvedre" />
      <Feature title = "Regisztrálj" text = "Amennyiben többre vágysz, mi megadhatjuk neked a kellő odafigyelést" />
    </div>

  </div>
);

export default WhatMovieSeeker;
