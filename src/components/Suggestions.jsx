import React from 'react';

const Suggestions = ({ results }) => {

    if (results instanceof Array) {

        const choice = results.map(result => (

        <li className = "suggestions">
            { result.Title }
        </li>
    ));
          return <ul>{ choice }</ul>
}

};

export default Suggestions;