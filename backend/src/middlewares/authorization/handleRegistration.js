const userRegistration = require("../../utils/authorization/userRegistration");

module.exports = async (req, res, next) => {
    const {id, username} = await userRegistration(req.body);

    if (id) {
        req.userId = id;
        req.username = username;
        next();
    } else {
        return res.status(500).json({
            success: false,
            blameUser: false,
            reason: "Szerverhiba!"
        });
    }
}