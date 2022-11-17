import React from 'react';
import '../styles/home.css';
import Result from './Result';


const Results = ({ results, openPopup }) => {


	return (

		<section className = "results">
			{
				!results ?   <p className = "movie-not-found-error-message"> Nincs találat, kérem keressen újra! </p>:
				results.map(result => (

				<Result key = { result.ImdbID } result = { result } openPopup = { openPopup } />
			))}
		</section>
	);
};

export default Results;