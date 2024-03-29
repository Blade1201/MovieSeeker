import React, {Fragment, useState} from 'react';
import "../styles/about.css";
import Back from "../images/back.png";
import {Link} from "react-router-dom";



const About = () => {

    const [toggleTab, setToggleTab] = useState(1);
    const toggleState = (index) => {
        setToggleTab(index)
    }


    const [toggleTabRoman, setToggleTabRoman] = useState(1);
    const toggleStateRoman = (index) => {
        setToggleTabRoman(index)
    }



    return (
        <Fragment>

            <section className = "about">

                    <div className = "return-hub">
                          <Link to = "/">  <img src = { Back } alt = "back-to-hub"/> </Link>
                    </div>

                <div className = "row">

                    <div className = "column">
                        <div className = "about-img"></div>
                        <p className = "person-name"> Futó Tibor </p>
                    </div>

                    <div className = "column">
                        <div className = "tabs">

                            <div className = { toggleTab === 1 ? "single-tab active-tab" : "single-tab" } onClick = { () => toggleState(1) }>
                                <h2> Magamról </h2>
                            </div>


                            <div className = { toggleTab === 2 ? "single-tab active-tab" : "single-tab" } onClick = { () => toggleState(2) }>
                                <h2> Készségek </h2>
                            </div>


                            <div className = { toggleTab === 3 ? "single-tab active-tab" : "single-tab" } onClick = { () => toggleState(3) }>
                                <h2> Hobbik </h2>
                            </div>
                        </div>


                        <div className = "tab-content">

                            <div className = { toggleTab === 1 ? "content active-content" : "content" }>
                                <p className = "about-myself"> Az IT problémák megoldásainak ördöge, aki problémamegoldó képességével számos teljesíthetetlennek tűnő
                                    feladatra talált megoldást. A projekt
                                    alapítója, koordinációs kézsége és a háttérben futó folyamatok kidolgozásai nélkül, ma nem létezne a MovieSeeker. Igazi veterán, aki
                                    rajong a kihívásokért, de nem szeret hosszú időre beragadni egyetlen feladatba sem. </p>

                                <p className = "quote"> Sohasem győzhetjük le a démonjainkat, <br/> de megtanulhatunk túlnőni rajtuk!
                                    <br/> <span> @Benedict Cumberbatch </span></p>
                            </div>

                        </div>

                        <div className = { toggleTab === 2 ? "content active-content" : "content" }>

                            <div className = "skills-row">


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> Backend fejlesztés </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar backend-developer">
                                                <span> 80% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> Adatbázis elmélet </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar database">
                                                <span> 70% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> Git/GitHub </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar github">
                                                <span> 70% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> JavaScript </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar javascript">
                                                <span> 90% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> SQL </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar sql">
                                                <span> 80% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> NoSQL </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar nosql">
                                                <span> 90% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className = { toggleTab === 3 ? "content active-content" : "content" }>
                            <div className = "hobbies-column">

                                <div className = "box">
                                    <div className = "content">
                                        <div className = "icon">
                                            <ion-icon name = "book-outline"></ion-icon>
                                            <div className = "text">
                                                <h4> Olvasás </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className = "box">
                                    <div className = "content">
                                        <div className = "icon">
                                            <ion-icon name = "reader-outline"></ion-icon>
                                            <div className = "text">
                                                <h4> Versek írása </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "box">
                                    <div className = "content">
                                        <div className = "icon">
                                            <ion-icon name = "game-controller-outline"></ion-icon>
                                            <div className = "text">
                                                <h4> Videójátékozás </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "box">
                                    <div className = "content">
                                        <div className = "icon">
                                            <ion-icon name = "tv-outline"></ion-icon>
                                            <div className = "text">
                                                <h4> Média tartalom fogyasztása </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>

                    </div>
                </div>

            </section>




            <section className = "about">

                <div className = "row">

                    <div className = "column">
                        <div className = "about-img-roman"></div>
                        <p className = "person-name"> Holovacki Román </p>
                    </div>

                    <div className = "column">
                        <div className = "tabs">

                            <div className = { toggleTabRoman === 1 ? "single-tab active-tab" : "single-tab" } onClick = { () => toggleStateRoman(1) }>
                                <h2> Magamról </h2>
                            </div>


                            <div className = { toggleTabRoman === 2 ? "single-tab active-tab" : "single-tab" } onClick = { () => toggleStateRoman(2) }>
                                <h2> Készségek </h2>
                            </div>


                            <div className = { toggleTabRoman === 3 ? "single-tab active-tab" : "single-tab" } onClick = { () => toggleStateRoman(3) }>
                                <h2> Hobbik </h2>
                            </div>
                        </div>


                        <div className = "tab-content">

                            <div className = { toggleTabRoman === 1 ? "content active-content" : "content" }>
                                <p className = "about-myself"> Igazi kreatív elme. Szabadidejében videójátékok fejlesztésében vesz részt, kiemelkedő elszántsága valamint kitartása és a
                                    kreatív nézetei nélkül a MovieSeeker kevésbé lenne felhasználó barát. Ördögien elhivatott, aki
                                    sohasem adja fel a kítűzött céljait. </p>

                                <p className = "quote"> Azt az utat ami mögötted van, már nem javíthatod meg.<br/> Viszont azt az utat, ami előtted van, még szebbé teheted!
                                  <br/> <span> @Keanu Reeves </span></p>
                            </div>

                        </div>

                        <div className = { toggleTabRoman === 2 ? "content active-content" : "content" }>

                            <div className = "skills-row">
                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> Videójáték fejlesztés </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar game-developer">
                                                <span> 80% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> Playmaker </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar playmaker">
                                                <span> 90% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> PhysX </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar physx">
                                                <span> 70% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> Adatbázis elmélet </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar database-roman">
                                                <span> 80% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> Git/GitHub </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar github-roman">
                                                <span> 80% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> HTML/CSS </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar html-css">
                                                <span> 90% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> SQL </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar sql">
                                                <span> 80% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "skills-column">
                                    <div className = "progress-wrap">
                                        <h3> C++ </h3>
                                        <div className = "progress">
                                            <div className = "progress-bar cplus">
                                                <span> 60% </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className = { toggleTabRoman === 3 ? "content active-content" : "content" }>
                            <div className = "hobbies-column">


                                <div className = "box">
                                    <div className = "content">
                                        <div className = "icon">
                                            <ion-icon name = "musical-notes-outline"></ion-icon>
                                            <div className = "text">
                                                <h4> Zenehallgatás </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "box">
                                    <div className = "content">
                                        <div className = "icon">
                                            <ion-icon name = "barbell-outline"></ion-icon>
                                            <div className = "text">
                                                <h4> Testedzés </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "box">
                                    <div className = "content">
                                        <div className = "icon">
                                            <ion-icon name = "game-controller-outline"></ion-icon>
                                            <div className = "text">
                                                <h4> Videójátékozás </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className = "box">
                                    <div className = "content">
                                        <div className = "icon">
                                            <ion-icon name = "tv-outline"></ion-icon>
                                            <div className = "text">
                                                <h4> Média tartalom fogyasztása </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>

                    </div>
                </div>

            </section>

        </Fragment>
    );
}

export default About;