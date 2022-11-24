import React from 'react';
import possibilityImage from '../../images/possibility.png';
import '../../styles/hub/possibility.css';
import { TypeAnimation } from 'react-type-animation';
import {Link} from "react-router-dom";



const Possibility = () => (

  <div className = "possibility section__padding" id = "premium-account">

    <div className = "possibility-image">
      <img src = {possibilityImage} alt = "possibility" />
    </div>

    <div className = "possibility-content">

      <Link to = "/authentication"> Fizess elő a további lehetőségekért  </Link>
      <h1 className = "gradient__text"> A lehetőségek <br /> minden képzeletet felülmúlnak </h1>

      <p> <TypeAnimation
          sequence = {[
              'Top 50 média tartalom',
              1000,
              'Média tartalom értékelése',
              1000,
              'Nézőlista',
              1000,
              'Megnézettek listája',
              1000
          ]}
          wrapper = "p"
          cursor = {true}
          repeat = {Infinity}
          style = {{ fontSize: '2em' }}
      /></p>

        <Link to = "/authentication"> Fizess elő a további lehetőségekért  </Link>
    </div>

  </div>
);

export default Possibility;
