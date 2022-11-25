import React from "react";
import SearchIcon from "../images/search.png"

const Search = ({ handleInput,search, button}) => {


    return(

        <div className = "inputBox">
             <input type = "text" required = "required" onChange = { handleInput } onKeyDown = { search } />
            <span> Keresés... </span>
            <img src = { SearchIcon } alt = "search-icon" onClick = { button }/>
       </div>

);
};

export default Search;
