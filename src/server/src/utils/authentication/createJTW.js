const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../../configs/authentication.config");
module.exports = (id) => {
    if (id) {
        return jwt.sign({id}, JWT_SECRET_KEY, {expiresIn: 300});
    }
    return null;
}