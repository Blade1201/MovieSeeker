import React from 'react';

const Suggestions = ({results}) => {

    if (results instanceof Array) {

        const options = results.map(result => (
        <li className="suggestions">
            {result.Title}
        </li>
    ))
          return <ul>{options}</ul>
}

}

export default Suggestions;