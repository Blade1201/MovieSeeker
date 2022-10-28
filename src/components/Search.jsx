import React from "react";

function Search(props){

    return(
            <input type="text" placeholder="Keresés..." className="searchbox" onChange = {props.handleInput} onKeyPress = {props.search}/>
    )
}

export default Search;