import React from "react";


const Search = ({ handleInput,search }) => {


    return(

        <div className="inputBox">
             <input type="text" required="required" onChange = { handleInput } onKeyDown = { search } />
             <span> Keresés... </span>
        </div>

);
};

export default Search;
