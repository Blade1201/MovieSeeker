import axios from "axios";


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
            return true;
        } else {
            localStorage.removeItem("token");
            return false;
        }
    });
}

export default isLoggedIn;

