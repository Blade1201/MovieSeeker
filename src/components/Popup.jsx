import React from 'react';
import "../styles/popup.css"
import ReplacementImage from '../images/image-not-found.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YouTube from "react-youtube";


const Popup = ({ selected, closePopup }) => {


	const castSliderSettings = {
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
		swipeToSlide: true
	};


	const providerSliderSettings = {
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
			<div className = "content">
                
				<h2>{ selected.Title } <span> ({ selected.Year }) </span></h2>

				<p className = "rating"> Értékelés: { selected.Ratings } </p>
				<p className = "genre"> Műfaj: { selected.Genre } </p>
				<p className = "runtime"> Játékidő: { selected.Runtime } perc </p>



				<div className = "plot">

					{selected.Poster !== null ?
						<img className = "plot-image" src = { selected.Poster } alt = { selected.Title }
							 onError = { e => e.target.src = ReplacementImage }/>

						: <img className = "plot-image" alt = "image-not-found!" src = { ReplacementImage }/>
					}



						<div className = "slider-provider-paragraph">

							<h1> Sugározható </h1>

						</div>
						<div >

							<Slider {...providerSliderSettings}>

								{selected.Providers !== null ? selected.Providers.map(item => (

									<div >
										<img className = "slider-provider-image" src = { item.Logo } alt = { item.Name }
											 onError = { e => e.target.src = ReplacementImage } />

										<p className = "slider-provider-name"> { item.Name } </p>
									</div>

								)) : <img className = "slider-provider-image" alt = "image-not-found!" src = { ReplacementImage }/>}

							</Slider>

						</div>




					<div className = "slider-cast-paragraph">

						<h1> Szereplők </h1>

					</div>
					<div >

						<Slider {...castSliderSettings}>

							{selected.Cast !== null ? selected.Cast.map(item => (

								<div >
									<img className = "slider-cast-image" src = { item.Image } alt = { item.Name }
										 onError = { e => e.target.src = ReplacementImage }
									  />
									<p className = "slider-cast-name">{ item.Name }</p>
								</div>

							)) : <img className = "slider-cast-image" alt = "image-not-found!" src = { ReplacementImage }/>}

						</Slider>

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