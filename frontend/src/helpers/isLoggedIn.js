import axios from "axios";


const isLoggedIn = async () => {
    return axios.get("/authentication", {
        withCredentials: true
    }).then(res => {
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    }).catch(() => null);
}

export default isLoggedIn;

