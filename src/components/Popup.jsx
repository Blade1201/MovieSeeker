import React from 'react'
import ReplacementImage from '../images/image_not_found.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Popup = ({ selected, closePopup }) =>{
	let errorflag = true;


	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		accessibility: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000,
		focusOnSelect: true,
		pauseOnDotsHover: true,
		swipeToSlide: true
	};


	return (

		<section className="popup">
			<div className="content">
                
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>

				<p className="rating"> Értékelés: {selected.Ratings}</p>
				<p className="genre"> Műfaj: {selected.Genre}</p>
				<p className="runtime"> Játékidő: {selected.Runtime} perc</p>

				<div className="slider_cast_paragraph">
					<h1>Szereplők</h1>
				</div>
				<div >
					<Slider {...settings}>
						{selected.Cast.map((item) => (
							<div >
								<img className="slider_cast_image" src={item.Image}/>
								<p className="slider_cast_name">{item.Name}</p>
							</div>
						))}
					</Slider>
				</div>


				<div className="plot">
					<img src={selected.Poster} alt={selected.Title}
						 onError={(e)=>{ if (errorflag){ errorflag = false; e.target.src = ReplacementImage; } }} />

					<p>{selected.Plot}</p>
				</div>

				<button className="close" onClick={closePopup}> Bezárás </button>
			</div>
		</section>
	)
}

export default Popup