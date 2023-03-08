import React, {useContext, useEffect, useState} from 'react';
import "../styles/popup.css";
import ReplacementImage from '../images/image-not-found.jpg';
import Star from '../images/star.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YouTube from "react-youtube";
import Rating from "./Rating";
import Comments from "./comment-section/comments/Comments";
import userContext from "../contexts/userContext";
import axios from "axios";
import {Link} from "react-router-dom";
import {FavoriteContext} from "../contexts/favoriteContext";


const Popup = ({selected, closePopup}) => {

    const [activeModal, setModalActive] = useState(false);

    const [selectedRate, setSelectedRate] = useState(null);

    const [overallRate, setOverallRate] = useState(selected.Ratings);

    const {inFavorites, handleCreate, handleDelete} = useContext(FavoriteContext);

    const [isFavorite, setFavorite] = useState(inFavorites(selected));

    const {id: userId} = useContext(userContext);


    const addToFavorites = async () => {
        await handleCreate(selected);
        setFavorite(true);
    }

    const deleteFromFavorites = async () => {
        await handleDelete(selected);
        setFavorite(false);
    }

    useEffect(() => {
        if (selected.ImdbID) {
            axios.get(`/rating/${selected.ImdbID}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res["success"]) {
                        setSelectedRate(res["ratingScore"])
                    }
                })
                .catch(err => console.error(err));
        }
    }, [selected.ImdbID]);

    const getCertificationPath = (cert) => {
        try {
            return require(`../images/rated-${cert.toLowerCase()}.png`);
        } catch (e) {
            return require("../images/rated-everyone.png");
        }
    }


    const castCarouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        accessibility: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1500,
        focusOnSelect: false,
        pauseOnDotsHover: true,
        swipeToSlide: true,
    };


    const reducedCastCarouselSettings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000,
        focusOnSelect: false,
        pauseOnDotsHover: true,
        swipeToSlide: true,
    };


    const providerCarouselSettings = {
        dots: false,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        accessibility: true,
        arrows: false,
        focusOnSelect: false,
        pauseOnDotsHover: true,
        swipeToSlide: true
    };


    const videoOptions = {
        height: '390',
        width: '640',
        playerVars: {
            origin: window.location
        }
    };


    const videoData = () => {
        return selected.Videos?.length ? selected.Videos[0].Url : null;
    };

    return (

        <section className="popup" onClick={activeModal ? () => setModalActive(false) : null}>
            <div className="popup-content">

                <h2>{selected.Title} <span> ({selected.Year})
                    <img className="movie-ratings" alt="not-found!"
                         src={getCertificationPath(selected.Certification)}/>
				</span></h2>


                {selected.Ratings !== null ?
                    <p className="rating"> Értékelés: {overallRate} <img className="rating-star" alt="not-found!"
                                                                              src={Star}/></p> : ""}
                {selected.Ratings !== null ? <p className="genre"> Műfaj: {selected.Genre} </p> : ""}
                {selected.Ratings !== null ? <p className="runtime"> Játékidő: {selected.Runtime} perc </p> : ""}


                {
                    selected.ImdbID ?
                        userId ?
                            <button className="my-rating" onClick={() => setModalActive(true)}> Értékelem</button>
                            :
                            <Link className="my-rating" to="/authentication">Az értékeléshez jelentkezzen be!</Link>
                        :
                        null
                }

                {
                    activeModal ?
                    <Rating
                        active={activeModal}
                        selectedRate={selectedRate}
                        setSelectedRate={setSelectedRate}
                        imdbId={selected.ImdbID}
                        setOverallRate={setOverallRate}
                    />
                    :
                    null
                }

                {
                    selected.ImdbID && userId ?
                        isFavorite ?
                            <button className="delete-from-favorites" onClick={deleteFromFavorites}>Kedvencekből töröl</button>
                            :
                            <button className="add-to-favorites" onClick={addToFavorites}>Kedvencekhez ad</button>
                        :
                        null
                }


                <div className="content-plot">

                    {selected.Poster !== null ?
                        <img className="plot-image" src={selected.Poster} alt={selected.Title}
                             onError={e => e.target.src = ReplacementImage}/>

                        : <img className="plot-image" alt="not-found!" src={ReplacementImage}/>
                    }


                    <div className="carousel-container">

                        <div className="provider-paragraph">

                            <h1> Sugározható </h1>

                        </div>

                        <Slider {...providerCarouselSettings}>

                            {selected.Providers !== null ? selected.Providers.map((item, index) => (

                                <div className="carousel-size" key={index}>

                                    {item.Name === "HBO Max" ? <a target="blank" href="https://www.hbomax.com/hu/hu">
                                            <img className="provider-image" src={item.Logo} alt={item.Name}
                                                 onError={e => e.target.src = ReplacementImage}/> </a>

                                        : item.Name === "Netflix" ?
                                            <a target="blank" href="frontend/src/components/Popup">
                                                <img className="provider-image" src={item.Logo} alt={item.Name}
                                                     onError={e => e.target.src = ReplacementImage}/> </a>

                                            : item.Name === "Disney Plus" ?
                                                <a target="blank" href="https://www.disneyplus.com/hu-hu">
                                                    <img className="provider-image" src={item.Logo} alt={item.Name}
                                                         onError={e => e.target.src = ReplacementImage}/> </a>

                                                : item.Name === "Amazon Prime Video" ?
                                                    <a target="blank" href="frontend/src/components/Popup">
                                                        <img className="provider-image" src={item.Logo} alt={item.Name}
                                                             onError={e => e.target.src = ReplacementImage}/> </a>

                                                    : item.Name === "Apple TV Plus" ?
                                                        <a target="blank" href="frontend/src/components/Popup">
                                                            <img className="provider-image" src={item.Logo}
                                                                 alt={item.Name}
                                                                 onError={e => e.target.src = ReplacementImage}/> </a>

                                                        :
                                                        <img className="provider-image" src={item.Logo} alt={item.Name}
                                                             onError={e => e.target.src = ReplacementImage}/>}


                                    <p className="provider-name"> {item.Name} </p>

                                </div>

                            )) : <p className="content-not-found"> A műsor nem található! </p>}

                        </Slider>

                    </div>


                    <div className="carousel-container">

                        <div className="cast-paragraph">

                            <h1> Szereplők </h1>

                        </div>


                        {selected.Cast === null ? <p className="content-not-found"> A szereplők nem találhatóak! </p>
                            : selected.Cast.length > 4 ?

                                <Slider {...castCarouselSettings}>

                                    {selected.Cast.map((item, index) => (

                                        <div className="carousel-size" key={index}>

                                            <a target="blank" href={`https://www.google.hu/search?q=${item.Name}`}>
                                                <img className="cast-image" src={item.Image ?? ReplacementImage} alt={item.Name}
                                                /></a>

                                            <p className="cast-name">{item.Name}</p>

                                        </div>

                                    ))}

                                </Slider>

                                : <Slider {...reducedCastCarouselSettings}>

                                    {selected.Cast.map((item, index) => (

                                        <div className="carousel-size" key={index}>

                                            <a target="blank" href={`https://www.google.hu/search?q=${item.Name}`}>
                                                <img className="cast-image" src={item.Image ?? ReplacementImage} alt={item.Name}
                                                /></a>

                                            <p className="cast-name">{item.Name}</p>

                                        </div>

                                    ))}

                                </Slider>
                        }


                    </div>


                    <YouTube
                        videoId={videoData()}
                        opts={videoOptions}
                        className="video-player"
                    />


                    <p className="plot-paragraph"> {selected.Plot} </p>

                    {
                        selected.ImdbID &&
                        <Comments
                            currentUserId={userId}
                            currentImdbId={selected.ImdbID}
                        />
                    }

                </div>

                <button className="close" onClick={closePopup}> Bezárás</button>

            </div>
        </section>
    );
};

export default Popup;