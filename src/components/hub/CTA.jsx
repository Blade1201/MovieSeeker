import React from 'react';
import '../../styles/hub/cta.css';
import {Link} from "react-router-dom";



const CTA = () => (

  <div className = "call-to-action">

    <div className = "call-to-action-content">
      <p> Fizess elő a további lehetőségekért </p>
      <h3> Jeletkezz be még ma és fedezd fel a végtelen lehetőségeket </h3>
    </div>


    <div className = "call-to-action-button">

        <Link to = "/authentication"> Belépek </Link>
    </div>

  </div>
);

export default CTA;
