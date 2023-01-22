import axios from "axios";
import jwt from "jwt-decode";


const isLoggedIn = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    return axios.get("/authentication", {
        headers: {
            "x-access-token": token
        }
    }).then(res => {
        if (res["data"]["success"]) {
            const token = localStorage.getItem("token");
            localStorage.setItem("username", jwt(token).username);
            return true;
        } else {
            localStorage.removeItem("token");
            return false;
        }
    });
}

export default isLoggedIn;

