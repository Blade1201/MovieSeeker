const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../../configs/authentication.config");
const createJWT = require("../../utils/authentication/createJTW");

module.exports = (req, res) => {
    const token = createJWT(req.userId);

    let result;

    if (token) {
        result = {
            success: true,
            token
        }
    } else {
        result = {
            success: false,
            blameUser: false,
            reason: "Szerverhiba!"
        }
        res.status(500);
    }

    res.json(result);
}