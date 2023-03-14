import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import userContext from "./userContext";

export const FavoriteContext = createContext();

const getData = (favorite) => {
    return {
        imdbId: favorite["ImdbID"]
    }
}


export const Favorite = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    const {id} = useContext(userContext);

    const fetchData = async () => {
        try {
            const res = await axios.get("/favorite");
            setFavorites(res["data"]);
        } catch (e) {
            console.error(e.response);
        }
    };

    useEffect( () => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleCreate = async (favorite) => {
        try {
            await axios.post("/favorite", getData(favorite), {
                headers: {
                    "x-access-token" : localStorage.getItem("token")
                }
            });
            setFavorites([...favorites, favorite]);
        } catch (e) {
            console.error(e.response);
        }
    }

    const handleDelete = async (favorite) => {
        try {
            await axios.delete("/favorite", {
                headers: {
                    "x-access-token" : localStorage.getItem("token")
                },
                data: getData(favorite)
            });
            setFavorites(favorites.filter(value => value.ImdbID !== favorite.ImdbID));
        } catch (e) {
            console.error(e.response);
        }
    }

    const clearFavorites = () => {
        setFavorites([]);
    }

    const inFavorites = (media) => {
        return favorites.find(value => value.ImdbID === media.ImdbID);
    }

    return <FavoriteContext.Provider value={{favorites, handleCreate, handleDelete, clearFavorites, inFavorites}}>{children}</FavoriteContext.Provider>;
}