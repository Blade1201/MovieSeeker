import axios from "axios";


const isSubscribed = async () => {
    return axios.get("/subscription")
        .then(res => {
            return res.status === 200;
        }).catch(() => false);
}

export default isSubscribed;

