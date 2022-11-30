import React from 'react';
import "../styles/popup.css";
import ReplacementImage from '../images/image-not-found.jpg';
import RatedX from '../images/rated-x.png';
import Rated18 from '../images/rated-18.png';
import Rated16 from '../images/rated-16.png';
import Rated12 from '../images/rated-12.png';
import Rated6 from '../images/rated-6.png';
import RatedEveryone from '../images/rated-everyone.png';
import Star from '../images/star.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YouTube from "react-youtube";



const Popup = ({ selected, closePopup }) => {


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
		width: '640'
	};



	const videoData = () => {
		const video = [];
		let videoCode;

		if (selected.Videos !== null) {
			selected.Videos.forEach(data => video.push( data.Url ))
		}

		for (let i = 0; i < video.length; i++) {
			videoCode = video[0];
		}

		return videoCode;
	};



	return (

		<section className = "popup">
			<div className = "popup-content">
                
				<h2>{ selected.Title } <span> ({ selected.Year })

					{selected.Certification === "X" ? <img className = "movie-ratings" alt = "not-found!" src = { RatedX }/>
						: selected.Certification === "18" ? <img className = "movie-ratings" alt = "not-found!" src = { Rated18 }/>
						: selected.Certification === "16" ? <img className = "movie-ratings" alt = "not-found!" src = { Rated16 }/>
						: selected.Certification === "12" ? <img className = "movie-ratings" alt = "not-found!" src = { Rated12 }/>
						: selected.Certification === "6" || selected.Certification === "Children" ? <img className = "movie-ratings" alt = "not-found!" src = { Rated6 }/>
						: selected.Certification === "NR" || selected.Certification === "KN" ? <img className = "movie-ratings" alt = "not-found!" src = { RatedEveryone }/>
						: ""}

				</span></h2>


				{ selected.Ratings !== null ? <p className = "rating"> Értékelés: { selected.Ratings } <img className = "rating-star" alt = "not-found!" src = { Star }/></p> : ""}
				{ selected.Ratings !== null ? <p className = "genre"> Műfaj: { selected.Genre } </p> : ""}
				{ selected.Ratings !== null ? <p className = "runtime"> Játékidő: { selected.Runtime } perc </p> : ""}



				<div className = "content-plot">

					{selected.Poster !== null ?
						<img className = "plot-image" src = { selected.Poster } alt = { selected.Title }
							 onError = { e => e.target.src = ReplacementImage }/>

						: <img className = "plot-image" alt = "not-found!" src = { ReplacementImage }/>
					}




						<div className="carousel-container">

							<div className = "provider-paragraph">

								<h1> Sugározható </h1>

							</div>

							<Slider {...providerCarouselSettings}>

								{selected.Providers !== null ? selected.Providers.map(item => (

									<div className="carousel-size">

										{ item.Name === "HBO Max" ? <a target = "blank" href = "https://www.hbomax.com/hu/hu">
											<img className = "provider-image" src = { item.Logo } alt = { item.Name }
												 onError = { e => e.target.src = ReplacementImage } /> </a>

											: item.Name === "Netflix" ? <a target = "blank" href = "https://www.netflix.com/hu/">
						     				<img className = "provider-image" src = { item.Logo } alt = { item.Name }
												 onError = { e => e.target.src = ReplacementImage } /> </a>

				  							: item.Name === "Disney Plus" ? <a target = "blank" href = "https://www.disneyplus.com/hu-hu">
											<img className = "provider-image" src = { item.Logo } alt = { item.Name }
												 onError = { e => e.target.src = ReplacementImage } /> </a>

											: item.Name === "Amazon Prime Video" ? <a target = "blank" href = "https://www.primevideo.com/">
											<img className = "provider-image" src = { item.Logo } alt = { item.Name }
												 onError = { e => e.target.src = ReplacementImage } /> </a>

											: item.Name === "Apple TV Plus" ? <a target = "blank" href = "https://www.apple.com/hu/apple-tv-plus/">
											<img className = "provider-image" src = { item.Logo } alt = { item.Name }
												 onError = { e => e.target.src = ReplacementImage } /> </a>

											: <img className = "provider-image" src = { item.Logo } alt = { item.Name }
												   onError = { e => e.target.src = ReplacementImage } />}


													<p className = "provider-name"> { item.Name } </p>

									</div>

								)) : <p className="content-not-found"> A műsor nem található! </p>}

							</Slider>

						</div>





					<div className="carousel-container">

						<div className = "cast-paragraph">

							<h1> Szereplők </h1>

						</div>


						{selected.Cast === null ? <p className="content-not-found"> A szereplők nem találhatóak! </p>
							: selected.Cast.length > 4 ?

							<Slider {...castCarouselSettings}>

								{selected.Cast.map(item => (

									<div className="carousel-size">

										<a target="blank" href={`https://www.google.hu/search?q=${item.Name}`}>
											<img className="cast-image" src={item.Image} alt={item.Name}
												 onError={e => e.target.src = ReplacementImage}
											/></a>

										<p className="cast-name">{item.Name}</p>

									</div>

								)) }

							</Slider>

						: <Slider {...reducedCastCarouselSettings}>

								{selected.Cast.map(item => (

									<div className="carousel-size">

										<a target="blank" href={`https://www.google.hu/search?q=${item.Name}`}>
											<img className="cast-image" src={item.Image} alt={item.Name}
												 onError={e => e.target.src = ReplacementImage}
											/></a>

										<p className="cast-name">{item.Name}</p>

									</div>

								)) }

								</Slider>
						}


					</div>



					<YouTube
						videoId = { videoData() }
						opts = { videoOptions }
						className = "video-player"
					/>


					<p className = "plot-paragraph"> { selected.Plot } </p>

				</div>

				<button className = "close" onClick = { closePopup }> Bezárás </button>

			</div>
		</section>
	);
};

export default Popup;