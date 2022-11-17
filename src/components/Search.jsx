import React from "react";


const Search = ({ handleInput,search }) => {


    return(

            <input type = "text" placeholder = "Keresés..." className = "searchbox" onChange = { handleInput } onKeyDown = { search }/>

);
};

export default Search;
