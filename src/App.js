import React, { useState } from 'react'
import axios from 'axios'
import './styles/style.css'
import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'


function App() {
  
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });


  const apiurl = "http://www.omdbapi.com/?apikey=e7a640a0";




  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s)
          .then(({ data }) => {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        })

      });
    }
  }
  


  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });

  //  console.log(state.s)
  }




  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

  // console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }




  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }



  return (
    <div className="App">

    <div className="topbar">

      <p className='login'>Bejelentkezés</p>
      <p className='register'>Regisztráció</p>
      <img className='logo' alt='logo' src={require('./logo_transparent.png')} />
      <Search handleInput = {handleInput} search = {search}/>
    </div>
 

      <main>
      <Results results={state.results} openPopup={openPopup}/>
      {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>

    </div>
  )
}

export default App;
