import React from "react";

function Search(props){

    return(
        <section className="searcbox-wrap">
            <input type="text" placeholder="Keresés..." className="searchbox" onChange = {props.handleInput} onKeyPress = {props.search}/>
        </section>
    )
}

export default Search;