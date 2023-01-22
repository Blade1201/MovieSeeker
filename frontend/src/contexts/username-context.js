import {createContext} from "react";
import jwt from "jwt-decode";

const getUsername = () => {
    const token = localStorage.getItem("token");
    if (!token) return "";
    return jwt(token).username;
}

const UsernameContext = createContext({
    username: getUsername,
    setUsernameContext: () => {}
});

export default UsernameContext;