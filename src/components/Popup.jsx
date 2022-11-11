import React from 'react'
import ReplacementImage from '../images/image_not_found.jpg'

function Popup({ selected, closePopup }) {
	let errorflag = true;

	return (
		<section className="popup">
			<div className="content">
                
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>

				<p className="rating"> Értékelés: {selected.Ratings}</p>
				<p className="genre"> Műfaj: {selected.Genre}</p>
				<p className="runtime"> Játékidő: {selected.Runtime}</p>

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