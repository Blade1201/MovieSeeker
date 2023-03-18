import axios from "axios";

export const getComments = async (imdbId) => {
    return await axios.get(`/comments/${imdbId}`)
        .then(res => {
        return res.data;
    });
};

export const createComment = async (content, imdbId, parentId) => {
    return await axios.post("/comments", {
        content, parentId, imdbId
    }, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }).then(res => res.data).catch(err => err);
};

export const updateComment = async (content, id) => {
    return await axios.patch("/comments", {
        content,
        id
    }, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }).then(res => res.data).catch(err => err);
};

export const deleteComment = async (id) => {
    return await axios.delete("/comments", {
        data: {
            id
        },
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    });
};