const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../../configs/authentication.config");
module.exports = (id, username) => {
    if (id) {
        return jwt.sign({id, username}, JWT_SECRET_KEY);
    }
    return null;
}