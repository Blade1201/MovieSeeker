const userRegistration = require("../../utils/authorization/userRegistration");

module.exports = async (req, res, next) => {
    const newUserId = await userRegistration(req.body);

    if (newUserId !== undefined) {
        req.userId = newUserId;
        next();
        return;
    }

    return res.status(500).json({
        success: false,
        blameUser: false,
        reason: "Szerverhiba!"
    });
}