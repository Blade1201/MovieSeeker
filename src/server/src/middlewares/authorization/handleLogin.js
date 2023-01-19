const userLogin = require("../../utils/authorization/userLogin");

module.exports = async (req, res, next) => {
    const {id, username} = await userLogin(req.body);

    if (id) {
        req.userId = id;
        req.username = username;
        next();
    } else {
        res.status(400).json({
            success: false,
            blameUser: true,
            reason: "Helytelen felhasználónév-jelszó páros!"
        });
    }
}