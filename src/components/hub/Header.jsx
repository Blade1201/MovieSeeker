import React from 'react';
import people from '../../images/people.png';
import ai from '../../images/ai.png';
import '../../styles/hub/header.css';
import {Link} from "react-router-dom";



const Header = () => (

  <div className = "movieseeker-header section__padding" id = "home">
    <div className = "movieseeker-header-content">

      <h1 className = "gradient__text"> Épitsünk együtt valami újat </h1>
      <p> Szolgáltatásunk akár ingyenesen, regisztráció nélkül is használható PC-n, Laptopon vagy bármelyik okoseszközön. </p>


      <div className = "movieseeker-header-content__input">
        <Link to = "/search"> Kezdjük el </Link>
      </div>


      <div className = "movieseeker-header-content__people">
        <img src = {people} alt = "people" />
        <p> 1,600 ember már meglátogatta ezt az oldalt az elmúlt 24 órában </p>
      </div>


    </div>

    <div className = "movieseeker-header-image">
      <img src={ai} alt = "AI" />
    </div>


      <div className="scroll-downs">
          <div className="mouse">
              <div className="scroller"></div>
          </div>
      </div>


  </div>
);

export default Header;
