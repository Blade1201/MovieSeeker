import React, {useEffect, useState} from 'react';
import Home from "./components/Home";
import Authentication from "./authentication/Authentication";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Hub from "./Hub";
import About from "./components/About";
import GuestRoute from "./components/GuestRoute";
import UserContext from "./contexts/userContext";
import isLoggedIn from "./helpers/isLoggedIn";
import GetFavorites from "./components/GetFavorites";
import {Favorite} from "./contexts/favoriteContext";
import SubscriptionRoute from "./components/SubscriptionRoute";
import Popular from "./components/Popular";
import GetWatchlist from "./components/GetWatchlist";
import {Watchlist} from "./contexts/watchlistContext";
import PricingTable from "./components/PricingTable";
import Dashboard from "./components/Dashboard";



const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState("");
    const [rank, setRank] = useState('G');
    const [id, setId] = useState(0);
    const [subscribed, setSubscribed] = useState(false);
    const user = {loggedIn, setLoggedIn, name, setName, rank, setRank, id, setId, subscribed, setSubscribed};

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let loader;
        isLoggedIn()
            .then(result => {
                setLoggedIn((prevValue) => {
                    if (prevValue === !!result) {
                        setLoading(false);
                        return prevValue;
                    } else {
                        loader = setTimeout(() => {
                            setLoading(false);
                        }, 200);
                        setName(result["username"]);
                        setRank(result["rank"]);
                        setId(result["id"]);
                        setSubscribed(result["subscribed"]);
                        return true;
                    }
                })
            });
        return () => clearTimeout(loader);
    }, []);


  return ( loading ? null :
    <div className = "App">

        <UserContext.Provider value={user}>
            <Favorite>
                <Watchlist>
                    <BrowserRouter>

                        <Routes>

                            <Route path = "/" element = { <Hub/> }/>

                            <Route path = "/about" element = { <About/> }/>

                            <Route path = "/search" element = {<Home/>}/>

                            <Route path = "/favorite" element={<GetFavorites />} />

                            <Route path = "/authentication" element = {
                                <GuestRoute component={ Authentication } />
                            }/>

                            <Route path="/popular/:type" element={
                                <SubscriptionRoute component={ Popular }/>
                            }/>

                            <Route path="/watchlist/:type" element={
                                <SubscriptionRoute component={GetWatchlist}/>
                            }/>

                            <Route path="/checkout" element={<PricingTable />} />

                            <Route path="/dashboard" element={<Dashboard />} />

                        </Routes>

                    </BrowserRouter>
                </Watchlist>
            </Favorite>
        </UserContext.Provider>

    </div>
  );
};


export default App;