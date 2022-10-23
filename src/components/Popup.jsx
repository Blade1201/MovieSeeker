import React from 'react'

function Popup({ selected, closePopup }) {
	return (
		<section className="popup">
			<div className="content">
                
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>

				<p className="rating"> Értékelés: {selected.imdbRating}</p>

				<div className="plot">
					<img src={selected.Poster} />
					<p>{selected.Plot}</p>
				</div>

				<button className="close" onClick={closePopup}> Bezárás </button>
			</div>
		</section>
	)
}

export default Popup