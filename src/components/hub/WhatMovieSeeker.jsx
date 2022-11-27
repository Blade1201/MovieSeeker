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
      <h1 className = "gradient__text"> A lehetőségek meghaladják a képzeletet </h1>
        <Link to = "/search"> Fedezzük fel </Link>
    </div>


    <div className = "what-movieseeker-container">
      <Feature title = "Nézelődjön" text = "Legyen az mozifilm esetleg tv sorozat, nálunk mindent megtalálhat" />
      <Feature title = "Böngésszen" text = "Számos tartalom közül válogathat kedvére" />
      <Feature title = "Regisztráljon" text = "Amennyiben többre vágyik, mi megadhatjuk a kellő odafigyelést" />
    </div>

  </div>
);

export default WhatMovieSeeker;
