import React from "react";

function Search({handleInput,search}){


    return(

            <input type="text" placeholder="Keresés..." className="searchbox" onChange = {handleInput} onKeyDown = {search}/>

)
}

export default Search;
