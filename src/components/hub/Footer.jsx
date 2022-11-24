import React from 'react';
import '../../styles/hub/footer.css';
import {Link} from "react-router-dom";



const Footer = () => (

  <div className = "footer section__padding">

    <div className = "footer-heading">
      <h1 className = "gradient__text"> Szeretnél mások előtt belépni a jövőbe? </h1>
    </div>


    <div className = "footer-button">
        <Link to = "/authentication"> Belépek </Link>
    </div>


    <div className = "footer-links">
      <div className = "footer-links_logo">
        <h1> MovieSeeker </h1>
        <p >Nyiregyháza 4400 <br /> Szabolcs-Szatmár-Bereg </p>
        <p className = "rights"> Minden jog fenntartva </p>
      </div>


      <div className = "footer-links_div">
        <h4> Hivatkozások </h4>
        <p> Közösségi média </p>
        <p> Rólunk </p>
      </div>


      <div className = "footer-links_div">
        <h4> Cégünk </h4>
        <p> Felhasználási feltételek </p>
        <p> Adatvédelmi irányelvek </p>
          <p> Kapcsolatfelvétel </p>
      </div>


      <div className = "footer-links_div">
        <h4> Lépj kapcsolatba </h4>
        <p> Nyiregyháza 4400 <br /> Szabolcs-Szatmár-Bereg </p>
        <p> 085-132567 </p>
        <p> info@nyirszikszi.net </p>
      </div>
    </div>


    <div className = "footer-copyright">
      <p> @2023 MovieSeeker. Minden jog fenntartva. </p>
    </div>

  </div>
);

export default Footer;