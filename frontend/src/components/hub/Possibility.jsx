import React from 'react';
import possibilityImage from '../../images/possibility.png';
import '../../styles/hub/possibility.css';
import Typewriter from "typewriter-effect";
import {Link} from "react-router-dom";



const Possibility = () => (

  <div className = "possibility section__padding" id = "premium-account">

    <div className = "possibility-image">
      <img src = {possibilityImage} alt = "possibility" />
    </div>

    <div className = "possibility-content">

      <Link to = "/authentication"> Fizessen elő a további lehetőségekért  </Link>
      <h1 className = "gradient__text"> A lehetőségek <br /> minden képzeletet felülmúlnak </h1>

          <div className="typewriter">
              <Typewriter
                  options={{
                      strings: ['Top 50 média tartalom', 'Média tartalom értékelése','Nézőlista'],
                      autoStart: true,
                      loop: true,
                      delay: 55,
                      deleteSpeed: 30
                  }}
              />
          </div>


        <Link to = "/authentication"> Fizessen elő a további lehetőségekért  </Link>
    </div>

  </div>
);

export default Possibility;
