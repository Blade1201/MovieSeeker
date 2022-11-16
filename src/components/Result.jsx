import React from 'react';
import ReplacementImage from '../images/image_not_found.jpg';


const Result = ({ result, openPopup }) =>{

	return (
		<div className="result" onClick={() => openPopup({id: result.Id, type: result.Type})}>

			{result.Poster !== null ?
				<img alt={result.Title} src={result.Poster}
					 onError={e => e.target.src = ReplacementImage}/>
				: <img alt={result.Title} src={ReplacementImage}/>
			}

			<h3>{result.Title}</h3>
		</div>
	)
}

export default Result;