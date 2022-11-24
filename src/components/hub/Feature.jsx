import React from 'react';
import '../../styles/hub/feature.css';



const Feature = ({ title, text }) => (

  <div className = "what-movieseeker__features-container__feature">

    <div className = "what-movieseeker__features-container__feature-title">
      <h1> { title } </h1>
    </div>

    <div className = "what-movieseeker__features-container_feature-text">
      <p> { text } </p>
    </div>

  </div>
);

export default Feature;