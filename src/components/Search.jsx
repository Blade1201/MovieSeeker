import React from "react";

function Search({handleInput,search}){


    return(

            <input type="text" placeholder="Keresés..." className="searchbox" onChange = {handleInput} onKeyPress = {search}/>

)
}

export default Search;
