import React from 'react'

function Popup({ selected, closePopup }) {
	return (
		<section className="popup">
			<div className="content">
                
				<h2>{ selected.Title } <span>({ selected.Year }) {selected.Rated}</span></h2>

				<p className="rating"> Értékelés: {selected.imdbRating}</p>
				<p className="genre"> Műfaj: {selected.Genre}</p>
				<p className="runtime"> Játékidő: {selected.Runtime}</p>

				<div className="plot">
					<img src={selected.Poster} alt={selected.Title}/>
					<p>{selected.Plot}</p>
				</div>

				<button className="close" onClick={closePopup}> Bezárás </button>
			</div>
		</section>
	)
}

export default Popup