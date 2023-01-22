const userLogin = require("../../utils/authorization/userLogin");

module.exports = async (req, res, next) => {
    const result = await userLogin(req.body);

    if (result) {
        req.userId = result.id;
        req.username = result.username;
        next();
    } else {
        res.status(400).json({
            success: false,
            blameUser: true,
            reason: "Helytelen felhasználónév-jelszó páros!"
        });
    }
}