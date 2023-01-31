import React, {useContext} from 'react';
import '../../styles/hub/footer.css';
import {Link} from "react-router-dom";
import userContext from "../../contexts/user-context";


const Footer = () => {
    const {loggedIn} = useContext(userContext);

    return (
        <div className = "footer section__padding">

            <div className = "footer-heading">
                <h1 className = "gradient__text"> Szeretne mások előtt belépni a jövőbe? </h1>
            </div>


            <div className = "footer-button">
                {loggedIn ?
                    null
                    :
                    <Link to = "/authentication"> Belépek </Link>
                }
            </div>


            <div className = "footer-links">
                <div className = "footer-links_logo">
                    <h1> MovieSeeker </h1>
                    <p> Nyíregyháza 4400 <br/> Szabolcs-Szatmár-Bereg </p>
                    <p className = "rights"> Minden jog fenntartva. </p>
                </div>


                <div className = "footer-links_div">
                    <h4> Hivatkozások </h4>
                    <p> <a target = "blank" href = "https://twitter.com/MovieSeek3r"> Közösségi média </a> </p>
                    <p><Link to = "/about"> Rólunk </Link></p>
                </div>


                <div className = "footer-links_div">
                    <h4> Cégünk </h4>
                    <p> <a target = "blank" href="https://drive.google.com/file/d/1O7P17BDGbDbYa2bs5kAxzs7Qs4mNYNw2/view?usp=share_link"> Adatkezelési tájékozatató </a> </p>
                    <p> <a target = "blank" href="https://drive.google.com/file/d/1gE48SSNeFcSadBxaXZ76j_22z7hf2CLE/view?usp=share_link"> Felhasználási feltételek </a> </p>
                    <p> <a target = "blank" href="https://drive.google.com/file/d/1--hf6fmrVw2x95QdJZyQ8BjVreU0oCHH/view?usp=share_link"> Szerzői jogok </a> </p>
                </div>


                <div className = "footer-links_div">
                    <h4> Lépjen kapcsolatba </h4>
                    <p> Nyíregyháza 4400 <br/> Szabolcs-Szatmár-Bereg </p>
                    <p> 085-132567 </p>
                    <p> info@movieseeker.hu </p>
                </div>
            </div>


            <div className = "footer-copyright">
                <p> @2023 MovieSeeker. Minden jog fenntartva. </p>
            </div>

        </div>
    );
}

export default Footer;
