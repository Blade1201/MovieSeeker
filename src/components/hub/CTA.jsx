import React from 'react';
import '../../styles/hub/cta.css';
import {Link} from "react-router-dom";



const CTA = () => (

  <div className = "call-to-action">

    <div className = "call-to-action-content">
      <Link to = "/authentication"> Fizessünk elő a további lehetőségekért </Link>
      <h3> Jeletkezzen be még ma és fedezze fel a végtelen lehetőségeket </h3>
    </div>


    <div className = "call-to-action-button">

        <Link to = "/authentication"> Belépek </Link>
    </div>

  </div>
);

export default CTA;
