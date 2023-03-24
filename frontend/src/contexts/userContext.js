import {createContext} from "react";

export default createContext({
    loggedIn: false,
    setLoggedIn: () => {},
    name: "",
    setName: () => {},
    rank: 'G',
    setRank: () => {},
    id: 0,
    setId: () => {},
    subscribed: false,
    setSubscribed: () => {},
    avatarPath: null,
    setAvatarPath: () => {}
});