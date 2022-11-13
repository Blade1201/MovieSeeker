import React from 'react'
import ReplacementImage from '../images/image_not_found.jpg'

function Popup({ selected, closePopup }) {
	let errorflag = true;


	// Non-Static
	{/*
	let table = document.createElement("table")
	const provide = () => {
		Object.values(selected.Providers).forEach(data => {

		})
	}
	provide()*/}

	// Static

	{/*let provider = []
	let provider_logo = []
	const providers = () =>{
		Object.values(selected.Providers).forEach(data => {
			console.log(data)
			provider.push(data.Name)
			provider_logo.push(data.Logo)
		})
	}
	providers()*/}


	return (
		<section className="popup">
			<div className="content">
                
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>

				<p className="rating"> Értékelés: {selected.Ratings}</p>
				<p className="genre"> Műfaj: {selected.Genre}</p>
				<p className="runtime"> Játékidő: {selected.Runtime} perc</p>

				{/*
				<div>{table}</div>


				<table>
					<tr>
						<th><img src={provider_logo} alt={provider}/></th>
					</tr>

					<tr>
						<td>{provider}</td>
					</tr>
				</table>*/}

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