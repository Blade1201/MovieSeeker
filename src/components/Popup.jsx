import React from 'react'
import ReplacementImage from '../images/image_not_found.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YouTube from "react-youtube";

const Popup = ({ selected, closePopup }) =>{



	const settings = {
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

	const settings_providers = {
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

	const options = {
		height: '390',
		width: '640'
		}




	const tomb = []
	let videoCode;

	// eslint-disable-next-line no-unused-expressions
	{ selected.Videos !== null ? selected.Videos.forEach(data => tomb.push(data.Url)) : ""}

	for (let i = 0; i < tomb.length; i++) {
		videoCode = tomb[0];
	}



	return (

		<section className="popup">
			<div className="content">
                
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>

				<p className="rating"> Értékelés: {selected.Ratings}</p>
				<p className="genre"> Műfaj: {selected.Genre}</p>
				<p className="runtime"> Játékidő: {selected.Runtime} perc</p>






				<div className="plot">
					<img className="plot_image" src={selected.Poster} alt={selected.Title}
						 onError={e => e.target.src = ReplacementImage} />


					<div className="slider_provider">
						<div className="slider_provider_paragraph">
							<h1>Sugározható</h1>
						</div>
						<div >
							<Slider {...settings_providers}>
								{selected.Providers !== null ? selected.Providers.map ((item) => (
									<div >
										<img className="slider_provider_image" src={item.Logo} alt={item.Name}
											 onError={e => e.target.src = ReplacementImage} />
										<p className="slider_provider_name">{item.Name}</p>
									</div>
								)) : <img className="slider_provider_image" src={ReplacementImage}/>}
							</Slider>
						</div>
					</div>



					<div className="slider_cast">
					<div className="slider_cast_paragraph">
						<h1>Szereplők</h1>
					</div>
					<div >
						<Slider {...settings}>

							{selected.Cast !== null ? selected.Cast.map((item) => (
								<div >
									<img className="slider_cast_image" src={item.Image} alt={item.Name}
										 onError={e => e.target.src = ReplacementImage}
									  />
									<p className="slider_cast_name">{item.Name}</p>
								</div>
							)) : ""}
						</Slider>
					</div>
				</div>


					<YouTube
						videoId={videoCode}
						opts={options}
						className="player"
					/>


					<p className="plot_paragraph">{selected.Plot}</p>
				</div>

				<button className="close" onClick={closePopup}> Bezárás </button>
			</div>
		</section>
	)
}

export default Popup