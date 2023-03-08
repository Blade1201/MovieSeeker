import axios from "axios";

const fetchListApiUtil = (url) => {
    return axios.get(url)
        .then(res => res.data)
        .then(json => json["results"] ?? [])
        .catch(console.error);
}

export default fetchListApiUtil;