const createJWT = require("../../utils/authentication/createJTW");

module.exports = (req, res) => {
    const token = createJWT(req.userId, req.username);

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