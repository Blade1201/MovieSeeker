import React, {useEffect, useState} from 'react';
import Home from "./components/Home";
import Authentication from "./authentication/Authentication";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Hub from "./Hub";
import About from "./components/About";
import GuestRoute from "./components/GuestRoute";
import UserContext from "./contexts/userContext";
import isLoggedIn from "./helpers/isLoggedIn";
import jwtDecode from "jwt-decode";
import GetFavorites from "./components/GetFavorites";
import {Favorite} from "./contexts/favoriteContext";



const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState("");
    const [rank, setRank] = useState('G');
    const [id, setId] = useState(0);
    const user = {loggedIn, setLoggedIn, name, setName, rank, setRank, id, setId};

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let loader;
        isLoggedIn()
            .then(success => {
                setLoggedIn((prevValue) => {

                    if (success === prevValue) {
                        setLoading(false);
                    } else {
                        setLoggedIn(true);
                        const jwtDecoded = jwtDecode(localStorage.getItem("token"));
                        setName(jwtDecoded["username"]);
                        setRank(jwtDecoded["rank"]);
                        setId(jwtDecoded["id"]);
                        loader = setTimeout(() => {
                            setLoading(false);
                        }, 800);
                    }

                    return success;
                });

            });
        return () => clearTimeout(loader);
    }, []);

  return ( loading ? null :
    <div className = "App">

        <UserContext.Provider value={user}>
            <BrowserRouter>

                <Routes>

                    <Route path = "/" element = { <Hub/> }/>

                    <Route path = "/about" element = { <About/> }/>

                    <Route path = "/search" element = { <Home/> }/>

                    <Route path = "/favorite" element={<Favorite><GetFavorites /></Favorite>} />

                    <Route path = "/authentication" element = {
                        <GuestRoute component={ Authentication } />
                    }/>

                </Routes>

            </BrowserRouter>
        </UserContext.Provider>

    </div>
  );
};


export default App;